import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type SyncStatus = "idle" | "syncing" | "completed" | "failed";
export type ItemSyncStatus = "synced" | "modified-locally" | "out-of-sync" | "syncing";

export type ModuleName = "campaigns" | "ad-groups" | "ads" | "assets" | "audience" | "keywords" | "location";

interface ModuleSyncState {
  status: SyncStatus;
  lastSynced: Date | null;
  itemsUpdated: number;
  error?: string;
}

interface ItemSyncState {
  status: ItemSyncStatus;
  isLocked: boolean;
}

interface SyncState {
  accountStatus: SyncStatus;
  lastAccountSync: Date | null;
  nextScheduledSync: Date | null;
  modules: Record<ModuleName, ModuleSyncState>;
  items: Record<string, ItemSyncState>;
  globalLock: boolean;
  syncProgress: {
    isOpen: boolean;
    currentStep: string;
    progress: number;
    totalSteps: number;
    currentStepNumber: number;
  };
}

interface SyncContextType extends SyncState {
  syncAccount: () => Promise<void>;
  syncModule: (module: ModuleName) => Promise<void>;
  syncItem: (itemId: string, module: ModuleName) => Promise<void>;
  getItemStatus: (itemId: string) => ItemSyncState;
  setItemModified: (itemId: string) => void;
  closeSyncProgress: () => void;
  resetError: () => void;
}

const initialModuleState: ModuleSyncState = {
  status: "idle",
  lastSynced: null,
  itemsUpdated: 0,
};

const defaultModules: Record<ModuleName, ModuleSyncState> = {
  campaigns: { ...initialModuleState },
  "ad-groups": { ...initialModuleState },
  ads: { ...initialModuleState },
  assets: { ...initialModuleState },
  audience: { ...initialModuleState },
  keywords: { ...initialModuleState },
  location: { ...initialModuleState },
};

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SyncState>({
    accountStatus: "idle",
    lastAccountSync: null,
    nextScheduledSync: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    modules: defaultModules,
    items: {},
    globalLock: false,
    syncProgress: {
      isOpen: false,
      currentStep: "",
      progress: 0,
      totalSteps: 0,
      currentStepNumber: 0,
    },
  });

  const simulateProgress = useCallback(async (steps: string[]): Promise<boolean> => {
    for (let i = 0; i < steps.length; i++) {
      setState(prev => ({
        ...prev,
        syncProgress: {
          isOpen: true,
          currentStep: steps[i],
          progress: ((i + 1) / steps.length) * 100,
          totalSteps: steps.length,
          currentStepNumber: i + 1,
        },
      }));
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }
    return true;
  }, []);

  const syncAccount = useCallback(async () => {
    setState(prev => ({
      ...prev,
      accountStatus: "syncing",
      globalLock: true,
      syncProgress: {
        isOpen: true,
        currentStep: "Initializing account sync...",
        progress: 0,
        totalSteps: 8,
        currentStepNumber: 0,
      },
    }));

    try {
      await simulateProgress([
        "Connecting to Google Ads API...",
        "Fetching campaigns...",
        "Syncing ad groups...",
        "Updating ads...",
        "Fetching assets...",
        "Syncing audience data...",
        "Updating keywords...",
        "Finalizing sync...",
      ]);

      const now = new Date();
      setState(prev => ({
        ...prev,
        accountStatus: "completed",
        lastAccountSync: now,
        nextScheduledSync: new Date(now.getTime() + 6 * 60 * 60 * 1000),
        globalLock: false,
        modules: Object.fromEntries(
          Object.keys(prev.modules).map(key => [
            key,
            { status: "completed" as SyncStatus, lastSynced: now, itemsUpdated: Math.floor(Math.random() * 10) + 1 },
          ])
        ) as Record<ModuleName, ModuleSyncState>,
        syncProgress: {
          ...prev.syncProgress,
          currentStep: "Sync completed successfully!",
          progress: 100,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        accountStatus: "failed",
        globalLock: false,
        syncProgress: {
          ...prev.syncProgress,
          currentStep: "Sync failed. Please try again.",
        },
      }));
    }
  }, [simulateProgress]);

  const syncModule = useCallback(async (module: ModuleName) => {
    setState(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [module]: { ...prev.modules[module], status: "syncing" },
      },
      syncProgress: {
        isOpen: true,
        currentStep: `Initializing ${module} sync...`,
        progress: 0,
        totalSteps: 4,
        currentStepNumber: 0,
      },
    }));

    try {
      await simulateProgress([
        `Connecting to Google Ads...`,
        `Fetching ${module} data...`,
        `Processing updates...`,
        `Finalizing ${module} sync...`,
      ]);

      const now = new Date();
      const itemsUpdated = Math.floor(Math.random() * 10) + 1;
      
      setState(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          [module]: { status: "completed", lastSynced: now, itemsUpdated },
        },
        syncProgress: {
          ...prev.syncProgress,
          currentStep: `${itemsUpdated} items updated successfully!`,
          progress: 100,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          [module]: { ...prev.modules[module], status: "failed", error: "Sync failed" },
        },
        syncProgress: {
          ...prev.syncProgress,
          currentStep: "Sync failed. Please try again.",
        },
      }));
    }
  }, [simulateProgress]);

  const syncItem = useCallback(async (itemId: string, module: ModuleName) => {
    setState(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [itemId]: { status: "syncing", isLocked: true },
      },
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    setState(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [itemId]: { status: "synced", isLocked: false },
      },
    }));
  }, []);

  const getItemStatus = useCallback((itemId: string): ItemSyncState => {
    return state.items[itemId] || { status: "synced", isLocked: false };
  }, [state.items]);

  const setItemModified = useCallback((itemId: string) => {
    setState(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [itemId]: { status: "modified-locally", isLocked: false },
      },
    }));
  }, []);

  const closeSyncProgress = useCallback(() => {
    setState(prev => ({
      ...prev,
      syncProgress: { ...prev.syncProgress, isOpen: false },
    }));
  }, []);

  const resetError = useCallback(() => {
    setState(prev => ({
      ...prev,
      accountStatus: "idle",
    }));
  }, []);

  return (
    <SyncContext.Provider
      value={{
        ...state,
        syncAccount,
        syncModule,
        syncItem,
        getItemStatus,
        setItemModified,
        closeSyncProgress,
        resetError,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error("useSync must be used within a SyncProvider");
  }
  return context;
}

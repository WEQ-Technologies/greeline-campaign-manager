import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface AdGroup {
  id: string;
  name: string;
  keywords: Array<{ keyword: string; matchType: string; bid: string }>;
}

interface AdGroupsKeywordsProps {
  data: {
    adGroups: AdGroup[];
  };
  onChange: (field: string, value: any) => void;
}

export function AdGroupsKeywords({ data, onChange }: AdGroupsKeywordsProps) {
  const [activeGroup, setActiveGroup] = useState<string>(data.adGroups[0]?.id || "");

  const addAdGroup = () => {
    const newGroup: AdGroup = {
      id: Date.now().toString(),
      name: `Ad Group ${data.adGroups.length + 1}`,
      keywords: [],
    };
    onChange("adGroups", [...data.adGroups, newGroup]);
    setActiveGroup(newGroup.id);
  };

  const updateAdGroup = (id: string, field: string, value: any) => {
    const updated = data.adGroups.map((group) =>
      group.id === id ? { ...group, [field]: value } : group
    );
    onChange("adGroups", updated);
  };

  const addKeyword = (groupId: string) => {
    const group = data.adGroups.find((g) => g.id === groupId);
    if (group) {
      const newKeyword = { keyword: "", matchType: "broad", bid: "" };
      updateAdGroup(groupId, "keywords", [...group.keywords, newKeyword]);
    }
  };

  const updateKeyword = (groupId: string, index: number, field: string, value: string) => {
    const group = data.adGroups.find((g) => g.id === groupId);
    if (group) {
      const updated = [...group.keywords];
      updated[index] = { ...updated[index], [field]: value };
      updateAdGroup(groupId, "keywords", updated);
    }
  };

  const removeKeyword = (groupId: string, index: number) => {
    const group = data.adGroups.find((g) => g.id === groupId);
    if (group) {
      const updated = group.keywords.filter((_, i) => i !== index);
      updateAdGroup(groupId, "keywords", updated);
    }
  };

  const activeAdGroup = data.adGroups.find((g) => g.id === activeGroup);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Ad Groups & Keywords</CardTitle>
            <CardDescription>Organize keywords into ad groups</CardDescription>
          </div>
          <Button onClick={addAdGroup} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Group
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {data.adGroups.map((group) => (
            <Badge
              key={group.id}
              variant={activeGroup === group.id ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
              onClick={() => setActiveGroup(group.id)}
            >
              {group.name}
            </Badge>
          ))}
        </div>

        {activeAdGroup && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ad Group Name</Label>
              <Input
                value={activeAdGroup.name}
                onChange={(e) => updateAdGroup(activeAdGroup.id, "name", e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Keywords</Label>
                <Button
                  onClick={() => addKeyword(activeAdGroup.id)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Keyword
                </Button>
              </div>

              {activeAdGroup.keywords.map((keyword, index) => (
                <div key={index} className="grid grid-cols-12 gap-2">
                  <Input
                    placeholder="Keyword"
                    className="col-span-5"
                    value={keyword.keyword}
                    onChange={(e) =>
                      updateKeyword(activeAdGroup.id, index, "keyword", e.target.value)
                    }
                  />
                  <Select
                    value={keyword.matchType}
                    onValueChange={(value) =>
                      updateKeyword(activeAdGroup.id, index, "matchType", value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="broad">Broad</SelectItem>
                      <SelectItem value="phrase">Phrase</SelectItem>
                      <SelectItem value="exact">Exact</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Bid"
                    type="number"
                    step="0.01"
                    className="col-span-3"
                    value={keyword.bid}
                    onChange={(e) =>
                      updateKeyword(activeAdGroup.id, index, "bid", e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="col-span-1"
                    onClick={() => removeKeyword(activeAdGroup.id, index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

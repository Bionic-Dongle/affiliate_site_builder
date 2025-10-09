import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  name: string;
  url: string;
  type: string;
  notes: string;
}

const ResourceManager = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newResource, setNewResource] = useState({
    name: "",
    url: "",
    type: "inspiration",
    notes: ""
  });

  const handleAddResource = () => {
    if (!newResource.name || !newResource.url) {
      toast({
        title: "Missing information",
        description: "Please provide both name and URL",
        variant: "destructive"
      });
      return;
    }

    const resource: Resource = {
      id: Date.now().toString(),
      ...newResource
    };

    setResources([...resources, resource]);
    setNewResource({ name: "", url: "", type: "inspiration", notes: "" });
    setIsAdding(false);
    
    toast({
      title: "Resource added",
      description: "Your resource has been saved successfully"
    });
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
    toast({
      title: "Resource deleted",
      description: "Resource has been removed"
    });
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      inspiration: "bg-purple-500/10 text-purple-500",
      component: "bg-blue-500/10 text-blue-500",
      tool: "bg-green-500/10 text-green-500",
      other: "bg-gray-500/10 text-gray-500"
    };
    return colors[type] || colors.other;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Resources</CardTitle>
          <CardDescription>
            Save websites, component libraries, and tools related to this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setIsAdding(!isAdding)} 
            className="mb-6"
            variant={isAdding ? "outline" : "default"}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isAdding ? "Cancel" : "Add Resource"}
          </Button>

          {isAdding && (
            <Card className="mb-6 border-primary/20">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Resource Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Daisy UI"
                      value={newResource.name}
                      onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={newResource.type} 
                      onValueChange={(value) => setNewResource({ ...newResource, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inspiration">Inspiration</SelectItem>
                        <SelectItem value="component">Component Library</SelectItem>
                        <SelectItem value="tool">Tool</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Colors, specific components, or other notes..."
                    value={newResource.notes}
                    onChange={(e) => setNewResource({ ...newResource, notes: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button onClick={handleAddResource} className="w-full">
                  Save Resource
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {resources.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No resources saved yet</p>
                <p className="text-sm">Add resources to keep track of inspiration, tools, and libraries for this project</p>
              </div>
            ) : (
              resources.map((resource) => (
                <Card key={resource.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{resource.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                            {resource.type}
                          </span>
                        </div>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {resource.url}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        {resource.notes && (
                          <p className="text-sm text-muted-foreground">{resource.notes}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteResource(resource.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceManager;

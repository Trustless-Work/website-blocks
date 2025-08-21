"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";

const categories = [
  "Dashboard",
  "Authentication",
  "E-commerce",
  "Marketing",
  "Navigation",
  "Forms",
  "Data Display",
  "Feedback",
  "Layout",
  "Other",
];

const frameworks = ["Next.js", "React", "Vue", "Svelte", "Angular"];

export function ContributeForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Submission</CardTitle>
        <CardDescription>
          Provide details about your component and we'll review it for inclusion
          in our library.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="component-name">Component Name *</Label>
                <Input
                  id="component-name"
                  placeholder="e.g., Advanced Dashboard"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your component, its features, and use cases..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Click tags to select relevant categories for your component.
              </p>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technical Details</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="framework">Primary Framework *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((framework) => (
                      <SelectItem
                        key={framework}
                        value={framework.toLowerCase()}
                      >
                        {framework}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dependencies">Dependencies</Label>
                <Input
                  id="dependencies"
                  placeholder="e.g., recharts, framer-motion"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="installation">Installation Instructions</Label>
              <Textarea
                id="installation"
                placeholder="Provide step-by-step installation instructions..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Files */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Files & Assets</h3>

            <div className="space-y-2">
              <Label htmlFor="files">Upload Files</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload component files, screenshots, or design assets
                </p>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept=".tsx,.ts,.jsx,.js,.png,.jpg,.jpeg,.gif,.svg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("files")?.click()}
                >
                  Choose Files
                </Button>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-url">Demo URL (optional)</Label>
              <Input
                id="demo-url"
                type="url"
                placeholder="https://your-demo-site.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source-url">Source Code URL (optional)</Label>
              <Input
                id="source-url"
                type="url"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub Username (optional)</Label>
                <Input id="github" placeholder="johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter Handle (optional)</Label>
                <Input id="twitter" placeholder="@johndoe" />
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" required />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </Label>
                <p className="text-xs text-muted-foreground">
                  By submitting this component, you agree that it can be
                  included in the Trustless Work library under the MIT license.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Component
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

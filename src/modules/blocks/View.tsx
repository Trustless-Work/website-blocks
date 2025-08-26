import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/shared/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import blocksData from "@/data/blocks.json";

export const Blocks = () => {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Blocks
            </h1>
            <p className="text-muted-foreground">
              Beautifully designed components that you can copy and paste into
              your apps.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blocks..."
                className="pl-8 w-full sm:w-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Tabs for categories */}
        <Tabs defaultValue="all" className="w-full mt-8">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-6 min-w-[600px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
              <TabsTrigger value="authentication">Auth</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blocksData.map((block) => (
                <Card
                  key={block.id}
                  className="group cursor-pointer transition-all hover:shadow-md"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={block.image || "/placeholder.svg"}
                        alt={block.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{block.title}</CardTitle>
                      <CardDescription>{block.description}</CardDescription>
                      <div className="flex flex-wrap gap-1">
                        {block.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blocks/${block.id}`}>
                          View Details <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-4 mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blocksData
                .filter((block) => block.category === "featured")
                .map((block) => (
                  <Card
                    key={block.id}
                    className="group cursor-pointer transition-all hover:shadow-md"
                  >
                    <CardHeader className="p-0">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={block.image || "/placeholder.svg"}
                          alt={block.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{block.title}</CardTitle>
                        <CardDescription>{block.description}</CardDescription>
                        <div className="flex flex-wrap gap-1">
                          {block.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/blocks/${block.id}`}>
                            View Details <ArrowRight className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Other category tabs */}
          {["sidebar", "authentication", "login", "calendar"].map(
            (category) => (
              <TabsContent
                key={category}
                value={category}
                className="space-y-4 mt-6"
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {blocksData
                    .filter((block) => block.category === category)
                    .map((block) => (
                      <Card
                        key={block.id}
                        className="group cursor-pointer transition-all hover:shadow-md"
                      >
                        <CardHeader className="p-0">
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img
                              src={block.image || "/placeholder.svg"}
                              alt={block.title}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-2">
                            <CardTitle className="text-lg">
                              {block.title}
                            </CardTitle>
                            <CardDescription>
                              {block.description}
                            </CardDescription>
                            <div className="flex flex-wrap gap-1">
                              {block.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/blocks/${block.id}`}>
                                View Details{" "}
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            )
          )}
        </Tabs>
      </div>
    </div>
  );
};

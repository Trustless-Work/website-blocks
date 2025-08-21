import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/shared/SiteHeader";
import { ArrowRight, Code, Palette, Zap } from "lucide-react";
import Link from "next/link";

export const Home = () => {
  return (
    <div className="min-h-screen container mx-auto">
      <SiteHeader />

      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
          <Badge variant="outline" className="mb-4">
            New Calendar Component →
          </Badge>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Building Blocks for the Web
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Clean, modern building blocks. Copy and paste into your apps. Works
            with all React frameworks. Open Source. Free forever.
          </p>
          <div className="flex flex-col gap-4 mt-6 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/blocks">
                Browse Blocks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contribute">Add a block</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blocks Preview Section */}
      <section className="space-y-6 my-12 md:my-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Browse Blocks
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Explore our collection of components organized by category
          </p>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-[500px]">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="featured" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group cursor-pointer transition-all hover:shadow-md">
                <CardHeader>
                  <div className="aspect-video rounded-md bg-muted" />
                  <CardTitle className="text-lg">
                    Dashboard with Sidebar
                  </CardTitle>
                  <CardDescription>
                    A dashboard with sidebar, charts and data table
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/blocks/dashboard-01">
                      More info <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group cursor-pointer transition-all hover:shadow-md">
                <CardHeader>
                  <div className="aspect-video rounded-md bg-muted" />
                  <CardTitle className="text-lg">Authentication Form</CardTitle>
                  <CardDescription>
                    Complete authentication flow with validation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/blocks/auth-01">
                      More info <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group cursor-pointer transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="aspect-video rounded-md bg-muted" />
                  <CardTitle className="text-lg">Calendar Component</CardTitle>
                  <CardDescription>
                    Interactive calendar with event management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/blocks/calendar-01">
                      More info <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/blocks">
                  Browse all blocks <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sidebar">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Sidebar components coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="authentication">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Authentication components coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="login">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Login components coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Calendar components coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

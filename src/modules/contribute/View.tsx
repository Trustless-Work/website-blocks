"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Code,
  GitFork,
  GitPullRequest,
  Users,
  Github,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Contribute = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const decorativeOpacityClass = !mounted
    ? "opacity-10"
    : theme === "dark"
      ? "opacity-10"
      : "opacity-30";

  return (
    <>
      <Image
        src="/design/wall.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/5 h-auto fixed -left-10 z-[-100] ${decorativeOpacityClass}`}
        quality={100}
      />

      <Image
        src="/design/wall.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/5 h-auto fixed -right-50 top-90 z-[-100] ${decorativeOpacityClass}`}
        quality={100}
      />
      <div className="min-h-screen">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="space-y-6 text-center mb-12">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Contribute to Trustless Work
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px] mx-auto sm:text-xl">
                Help us build the best component library by contributing through
                GitHub Pull Requests.
              </p>
            </div>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-sm">
                All contributions are reviewed via GitHub
              </Badge>
            </div>
          </div>

          {/* How it works */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-4 sm:text-3xl">
                How to Contribute
              </h2>
              <p className="text-muted-foreground max-w-[600px] mx-auto">
                Our contribution process uses GitHub to maintain quality and
                enable collaborative development.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <GitFork className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">1. Fork</CardTitle>
                  <CardDescription>
                    Fork our repository on GitHub to create your own copy of the
                    project.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">2. Create</CardTitle>
                  <CardDescription>
                    Build your component following our guidelines and add it to
                    the appropriate directory.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <GitPullRequest className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">3. Pull Request</CardTitle>
                  <CardDescription>
                    Submit a Pull Request with your changes, including
                    documentation and examples.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">4. Review</CardTitle>
                  <CardDescription>
                    Our team reviews and merges approved contributions to the
                    main library.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-4 sm:text-3xl">
                Step-by-Step Guide
              </h2>
              <p className="text-muted-foreground max-w-[600px] mx-auto">
                Follow these detailed steps to contribute your component to our
                library.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      1
                    </span>
                    Fork the Repository
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <p>
                      Visit our GitHub repository and click the "Fork" button to
                      create your own copy.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://github.com/Trustless-Work/react-library-trustless-work-blocks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Fork Repository
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      2
                    </span>
                    Clone and Setup
                  </CardTitle>
                  <CardDescription className="space-y-3">
                    <p>
                      Clone your fork locally and create a new branch for your
                      contribution:
                    </p>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm">
                      <div>
                        git clone
                        https://github.com/YOUR_USERNAME/Trustless-Work/react-library-trustless-work-blocks
                      </div>
                      <div>cd react-library-trustless-work-blocks</div>
                      <div>git checkout -b feature/your-component-name</div>
                      <div>npm install</div>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      3
                    </span>
                    Create Your Component
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <p>
                      Following the existing code guidelines, create your
                      component.
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      4
                    </span>
                    Submit Pull Request
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <p>
                      Push your changes and create a Pull Request with a clear
                      description:
                    </p>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm">
                      <div>git add .</div>
                      <div>git commit -m "feat: add your-component-name"</div>
                      <div>git push origin feature/your-component-name</div>
                    </div>
                    <p className="text-sm">
                      Then visit GitHub to create your Pull Request with
                      detailed information about your component.
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Guidelines */}
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold tracking-tight mb-4 sm:text-2xl">
                  Contribution Guidelines
                </h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Follow Design System
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Use our color palette, typography, and spacing
                        conventions.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Accessibility First
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Ensure your component meets WCAG 2.1 AA standards.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Responsive Design
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Components should work seamlessly across all device
                        sizes.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Clean Code</CardTitle>
                      <CardDescription className="text-sm">
                        Write readable, well-documented TypeScript/React code.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight mb-4 sm:text-2xl">
                  What We're Looking For
                </h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Dashboard Components
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Analytics cards, charts, data tables, and admin
                        interfaces.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Authentication Flows
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Login forms, signup pages, password reset, and social
                        auth.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        E-commerce Elements
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Product cards, shopping carts, checkout flows, and
                        pricing tables.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Marketing Sections
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Hero sections, feature grids, testimonials, and
                        call-to-action blocks.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Community */}
          <section className="my-20 text-center">
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Join Our Community
              </h2>
              <p className="text-muted-foreground max-w-[600px] mx-auto">
                Connect with other contributors, get feedback on your designs,
                and collaborate on GitHub.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/Trustless-Work/react-library-trustless-work-blocks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/Trustless-Work/react-library-trustless-work-blocks/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discussions
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/Trustless-Work/react-library-trustless-work-blocks/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Issues
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

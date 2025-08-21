import { CodeBlock } from "@/shared/CodeBlock";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const InstallationView = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-xl text-muted-foreground">
          How to install dependencies and structure your app.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create project
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Start by creating a new Next.js project using{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                create-next-app
              </code>
              :
            </p>

            <CodeBlock code="npx create-next-app@latest my-app --typescript --tailwind --eslint" />
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Run the CLI
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Run the{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                trustless-work
              </code>{" "}
              init command to setup your project:
            </p>

            <CodeBlock code="npx trustless-work@latest init" />

            <p className="leading-7">
              You will be asked a few questions to configure{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                components.json
              </code>
              :
            </p>

            <CodeBlock
              code={`Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Do you want to use CSS variables for colors? › no / yes`}
            />
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Fonts
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              I use{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                DM Sans
              </code>{" "}
              as the default font. DM Sans is not required. You can replace it
              with any other font.
            </p>

            <p className="leading-7">
              Here's how I configure DM Sans in Next.js:
            </p>

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Install the font
            </h3>

            <Tabs defaultValue="pnpm" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
                <TabsTrigger value="bun">bun</TabsTrigger>
              </TabsList>
              <TabsContent value="pnpm">
                <CodeBlock code="pnpm add next/font" />
              </TabsContent>
              <TabsContent value="npm">
                <CodeBlock code="npm install next/font" />
              </TabsContent>
              <TabsContent value="yarn">
                <CodeBlock code="yarn add next/font" />
              </TabsContent>
              <TabsContent value="bun">
                <CodeBlock code="bun add next/font" />
              </TabsContent>
            </Tabs>

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Configure the font
            </h3>

            <CodeBlock
              code={`import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}`}
              language="tsx"
              filename="app/layout.tsx"
            />
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            App structure
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Here's how I structure my Next.js apps. You can use this as a
              reference:
            </p>

            <CodeBlock
              code={`.
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── main-nav.tsx
│   ├── page-header.tsx
│   └── ...
├── lib
│   └── utils.ts
├── styles
│   └── globals.css
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json`}
              language="text"
            />

            <Alert>
              <AlertDescription>
                I place the UI components in the{" "}
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  components/ui
                </code>{" "}
                folder.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            That's it
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              You can now start adding components to your project.
            </p>

            <CodeBlock code="npx trustless-work@latest add button" />

            <p className="leading-7">
              The command above will add the{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                Button
              </code>{" "}
              component to your project. You can then import it like this:
            </p>

            <CodeBlock
              code={`import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}`}
              language="tsx"
              filename="app/page.tsx"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

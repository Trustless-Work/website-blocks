export const blocks = [
  {
    id: "dashboard-01",
    title: "Dashboard with Sidebar",
    description: "A dashboard with sidebar, charts and data table",
    category: "featured",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Dashboard", "Sidebar", "Charts"],
  },
  {
    id: "auth-01",
    title: "Authentication Form",
    description: "Complete authentication flow with validation",
    category: "authentication",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Auth", "Form", "Validation"],
  },
  {
    id: "calendar-01",
    title: "Calendar Component",
    description: "Interactive calendar with event management",
    category: "calendar",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Calendar", "Events", "Interactive"],
  },
  {
    id: "sidebar-01",
    title: "Navigation Sidebar",
    description: "Collapsible sidebar with navigation items",
    category: "sidebar",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Navigation", "Sidebar", "Menu"],
  },
  {
    id: "login-01",
    title: "Login Page",
    description: "Clean login page with social auth options",
    category: "login",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Login", "Social Auth", "Form"],
  },
  {
    id: "dashboard-02",
    title: "Analytics Dashboard",
    description: "Analytics dashboard with metrics and graphs",
    category: "featured",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Analytics", "Metrics", "Graphs"],
  },
];

export const blocks2 = {
  "dashboard-01": {
    title: "Dashboard with Sidebar",
    description: "A dashboard with sidebar, charts and data table",
    tags: ["Dashboard", "Sidebar", "Charts"],
    code: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <nav className="space-y-2 p-4">
          <Button variant="ghost" className="w-full justify-start">
            Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Reports
          </Button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}`,
    steps: [
      "Install the required dependencies",
      "Copy and paste the component code",
      "Update the import paths to match your project",
      "Customize the styling and content as needed",
    ],
  },
  "auth-01": {
    title: "Authentication Form",
    description: "Complete authentication flow with validation",
    tags: ["Auth", "Form", "Validation"],
    code: `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your email and password to sign in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  )
}`,
    steps: [
      "Install the required UI components",
      "Copy the authentication form code",
      "Add form validation logic",
      "Connect to your authentication provider",
    ],
  },
};

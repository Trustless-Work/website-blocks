import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommandIcon } from "lucide-react";

const CommingSoon = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CommandIcon className="w-4 h-4" /> Coming Soon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>This feature is coming soon</p>
      </CardContent>
    </Card>
  );
};

export default CommingSoon;

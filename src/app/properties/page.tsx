import { Suspense } from "react";
import PropertiesClient from "./properties-client";

export const metadata = {
  title: "Properties — LuxeEstate",
  description: "Browse our exclusive collection of luxury homes, apartments, and estates.",
};

export default function Page() {
  return (
    <Suspense>
      <PropertiesClient />
    </Suspense>
  );
}

// app/page.tsx
"use client";

import { useState } from "react";
import WebsiteTypeStep from "../components/WebsiteTypeStep";
import FeaturesStep    from "../components/FeaturesStep";
import CostStep        from "../components/CostStep";
import ChatStep        from "../components/ChatStep";
import SlotPicker      from "../components/SlotPicker";
import UserInfoForm    from "../components/UserInfoForm";

export default function Page() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>({});

  const next = (upd: any) => {
    setData(d => ({ ...d, ...upd }));
    setStep(s => s + 1);
  };

  return (
    <main className="max-w-lg mx-auto mt-10 space-y-6">
      <div className="text-center text-gray-600">
        Step {step} of 6
      </div>
      {step === 1 && <WebsiteTypeStep onNext={next} />}
      {step === 2 && <FeaturesStep data={data} onNext={next} />}
      {step === 3 && <CostStep     data={data} onNext={next} />}
      {step === 4 && <ChatStep     data={data} onNext={next} />}
      {step === 5 && <SlotPicker   onNext={next} />}
      {step === 6 && <UserInfoForm data={data} />}
    </main>
  );
}


import { DateRange } from "react-day-picker";
import CapitalCurveChart from "@/components/CapitalCurveChart";

interface CapitalCurveSectionProps {
  balanceView: "personal" | "subscribers";
  personalCapitalCurveData: Array<{ date: string; value: number }>;
  subscribersCapitalCurveData: Array<{ date: string; value: number }>;
}

const CapitalCurveSection = ({
  balanceView,
  personalCapitalCurveData,
  subscribersCapitalCurveData,
}: CapitalCurveSectionProps) => {
  return (
    <div className="mt-8 mb-6">
      <CapitalCurveChart 
        data={balanceView === "personal" ? personalCapitalCurveData : subscribersCapitalCurveData} 
      />
    </div>
  );
};

export default CapitalCurveSection;

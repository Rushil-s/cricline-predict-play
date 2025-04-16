
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PredictionQuestion } from "@/types";
import { toast } from "sonner";
import { predictionService } from "@/services/supabase";
import { useAuth } from "@/hooks/use-auth";

interface PredictionCardProps {
  question: PredictionQuestion;
  availablePoints: number;
  onPredictionPlaced?: () => void;
}

export function PredictionCard({ 
  question, 
  availablePoints, 
  onPredictionPlaced 
}: PredictionCardProps) {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [pointsToWager, setPointsToWager] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle placing the prediction
  const handlePlacePrediction = async () => {
    if (!user) {
      toast.error("Please sign in to place predictions");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }

    if (pointsToWager > availablePoints) {
      toast.error("You don't have enough CricPoints");
      return;
    }

    setIsSubmitting(true);

    try {
      await predictionService.createPrediction(
        user.id,
        question.match_id,
        question.question,
        selectedOption,
        pointsToWager
      );
      
      setSelectedOption(null);
      setPointsToWager(100);
      
      if (onPredictionPlaced) {
        onPredictionPlaced();
      }
    } catch (error) {
      console.error("Failed to place prediction:", error);
      toast.error("Failed to place prediction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 bg-cricblue-50">
        <h3 className="text-base font-semibold text-cricblue-900">{question.question}</h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-3">
        <RadioGroup 
          onValueChange={setSelectedOption} 
          value={selectedOption || ""}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border rounded-md">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <Label>Wager CricPoints</Label>
            <span className="font-bold text-cricblue-500">{pointsToWager}</span>
          </div>
          
          <Slider
            defaultValue={[100]}
            value={[pointsToWager]}
            min={50}
            max={Math.min(1000, availablePoints)}
            step={50}
            onValueChange={(val) => setPointsToWager(val[0])}
          />
          
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>50</span>
            <span>1000</span>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground flex justify-between">
            <span>Available: {availablePoints} CricPoints</span>
            <span>Potential Win: {pointsToWager * 2} CricPoints</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="default" 
          onClick={handlePlacePrediction} 
          className="w-full bg-cricblue-500 hover:bg-cricblue-600"
          disabled={!selectedOption || isSubmitting || pointsToWager > availablePoints}
        >
          {isSubmitting ? "Placing Prediction..." : "Place Prediction"}
        </Button>
      </CardFooter>
    </Card>
  );
}

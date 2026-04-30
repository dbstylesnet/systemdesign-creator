import { Check, X, RotateCcw, Star, AlertTriangle, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateScore, type QuizQuestion } from '@/data/quizData';

interface AnswerRecord {
  question: QuizQuestion;
  selectedOptionId: string;
  correct: boolean;
  attempts: number;
}

interface QuizSummaryProps {
  projectType: string;
  scale: string;
  answers: AnswerRecord[];
  onRestart: () => void;
}

export function QuizSummary({ projectType, scale, answers, onRestart }: QuizSummaryProps) {
  const {
    errorsScore,
    designScore,
    finalScore,
    rating,
    message,
    errorsExplanation,
    designExplanation,
  } = calculateScore(answers);

  const finalScoreDisplay = Number.isInteger(finalScore) ? finalScore.toString() : finalScore.toFixed(1);
  const filledStars = Math.round(finalScore / 2); // out of 5

  return (
    <div className="min-h-screen bg-background grid-bg px-4 py-20">
      <div className="mx-auto max-w-lg animate-slide-up">
        {/* Score Card */}
        <div className="mb-6 rounded-xl border-2 border-primary/40 summary-card-primary p-6 text-center">
          <div className="mb-3 flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-6 w-6',
                  i < filledStars ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                )}
              />
            ))}
          </div>
          <div className="text-5xl font-bold text-primary mb-1">{finalScoreDisplay}/10</div>
          <div className="text-lg font-semibold text-foreground">{rating}</div>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        </div>

        {/* Score Breakdown */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-destructive/40 summary-card-error p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
              Errors
            </div>
            <div className="mt-1 text-3xl font-bold text-destructive">{errorsScore}<span className="text-base text-muted-foreground">/10</span></div>
            <p className="mt-1 text-xs text-muted-foreground">{errorsExplanation}</p>
          </div>
          <div className="rounded-lg border border-success/40 summary-card-success p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Compass className="h-3.5 w-3.5 text-success" />
              Design Quality
            </div>
            <div className="mt-1 text-3xl font-bold text-success">{designScore}<span className="text-base text-muted-foreground">/10</span></div>
            <p className="mt-1 text-xs text-muted-foreground">{designExplanation}</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="mb-6 rounded-lg border border-border bg-card p-4">
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Project: </span>
              <span className="font-semibold text-foreground capitalize">{projectType}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Scale: </span>
              <span className="font-semibold text-foreground capitalize">{scale}</span>
            </div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="space-y-3 mb-8">
          {answers.map((answer, i) => {
            const selectedOption = answer.question.options.find(o => o.id === answer.selectedOptionId);
            const correctOptions = answer.question.options.filter(o => o.correct);
            const isFirstTryCorrect = answer.correct && answer.attempts === 1;

            return (
              <div
                key={i}
                className={cn(
                  'rounded-lg border p-4 animate-slide-up',
                  isFirstTryCorrect
                    ? 'border-success/30 bg-success/5'
                    : 'border-border bg-card',
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className={cn(
                    'mt-0.5 rounded-full p-0.5 shrink-0',
                    isFirstTryCorrect ? 'bg-success' : 'bg-muted',
                  )}>
                    {isFirstTryCorrect
                      ? <Check className="h-3 w-3 text-success-foreground" />
                      : <X className="h-3 w-3 text-muted-foreground" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{answer.question.question}</p>
                    <p className="text-xs text-primary mt-1">
                      Your answer: {selectedOption?.label}
                      {answer.attempts > 1 && (
                        <span className="text-muted-foreground"> ({answer.attempts} attempts)</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Other correct options */}
                {correctOptions.length > 1 && (
                  <div className="mt-2 ml-6">
                    <p className="text-xs text-muted-foreground mb-1">Also valid:</p>
                    <div className="flex flex-wrap gap-1">
                      {correctOptions
                        .filter(o => o.id !== answer.selectedOptionId)
                        .map(o => (
                          <span key={o.id} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            {o.label}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary/10 px-6 py-3 font-semibold text-primary transition-all hover:bg-primary/20 active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          Try Another Architecture
        </button>
      </div>
    </div>
  );
}

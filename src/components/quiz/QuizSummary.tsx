import { Check, X, RotateCcw, Star } from 'lucide-react';
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
  const correctFirstTry = answers.filter(a => a.correct && a.attempts === 1).length;
  const { score, rating, message } = calculateScore(answers.length, correctFirstTry);

  return (
    <div className="min-h-screen bg-background grid-bg px-4 py-20">
      <div className="mx-auto max-w-lg animate-slide-up">
        {/* Score Card */}
        <div className="mb-6 rounded-xl border-2 border-primary/30 bg-card p-6 text-center glow-primary">
          <div className="mb-3 flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-6 w-6',
                  i < Math.ceil(score / 2) ? 'fill-primary text-primary' : 'text-muted'
                )}
              />
            ))}
          </div>
          <div className="text-5xl font-bold text-primary mb-1">{score}/10</div>
          <div className="text-lg font-semibold text-foreground">{rating}</div>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
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

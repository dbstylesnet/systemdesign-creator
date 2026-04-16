import { useEffect, useRef, useState, useCallback } from 'react';
import { QuizCard } from './QuizCard';
import { ProgressTracker } from './ProgressTracker';
import { QuizSummary } from './QuizSummary';
import {
  projectTypes,
  scaleOptions,
  getQuestions,
  type ProjectType,
  type ScaleType,
  type QuizQuestion,
  type QuizOption,
} from '@/data/quizData';
import { cn } from '@/lib/utils';
import { QuizOptionIcon } from '@/lib/quizOptionIcon';
import { Check, X } from 'lucide-react';

type Phase = 'project' | 'scale' | 'quiz' | 'summary';

interface AnswerRecord {
  question: QuizQuestion;
  selectedOptionId: string;
  correct: boolean;
  attempts: number;
}

interface OptionState {
  [optionId: string]: 'correct' | 'incorrect' | undefined;
}

interface SelectionTrailItem {
  stepNumber: number;
  label: string;
  correct: boolean;
}

export function QuizFlow() {
  const [phase, setPhase] = useState<Phase>('project');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [selectedScale, setSelectedScale] = useState<ScaleType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectionTrail, setSelectionTrail] = useState<SelectionTrailItem[]>([]);
  const [optionStates, setOptionStates] = useState<OptionState>({});
  const [attempts, setAttempts] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [activeTip, setActiveTip] = useState<{ id: string; text: string } | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = contentRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setActiveTip(null);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTip(null);
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const questions = selectedProject && selectedScale
    ? getQuestions(selectedProject, selectedScale)
    : [];

  const currentQuestion = questions[currentQuestionIndex];

  const progressGroups = Array.from(
    selectionTrail.reduce((acc, item) => {
      const existing = acc.get(item.stepNumber) ?? [];
      existing.push({
        label: item.label,
        tone: item.correct ? ('success' as const) : ('error' as const),
      });
      acc.set(item.stepNumber, existing);
      return acc;
    }, new Map<number, Array<{ label: string; tone: 'success' | 'error' }>>()),
  )
    .sort(([a], [b]) => a - b)
    .map(([stepNumber, answers]) => ({ stepNumber, answers }));

  const handleProjectSelect = useCallback((id: ProjectType) => {
    setSelectedProject(id);
    setActiveTip(null);
    setPhase('scale');
  }, []);

  const handleScaleSelect = useCallback((id: ScaleType) => {
    setSelectedScale(id);
    setActiveTip(null);
    setPhase('quiz');
  }, []);

  const handleOptionSelect = useCallback((option: QuizOption) => {
    if (answered) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (option.correct) {
      setOptionStates(prev => ({ ...prev, [option.id]: 'correct' }));
      setFeedbackMessage({ text: `Good choice! ${option.explanation}`, type: 'success' });
      setAnswered(true);

      setSelectionTrail(prev => [...prev, { stepNumber: currentQuestionIndex + 1, label: option.label, correct: true }]);
      setAnswers(prev => [...prev, {
        question: currentQuestion!,
        selectedOptionId: option.id,
        correct: true,
        attempts: newAttempts,
      }]);
    } else {
      setOptionStates(prev => ({ ...prev, [option.id]: 'incorrect' }));
      setFeedbackMessage({ text: option.explanation, type: 'error' });
      setSelectionTrail(prev => [...prev, { stepNumber: currentQuestionIndex + 1, label: option.label, correct: false }]);

      // Clear error message after delay
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    }
  }, [answered, attempts, currentQuestion, currentQuestionIndex, questions.length]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setOptionStates({});
      setAttempts(0);
      setFeedbackMessage(null);
      setAnswered(false);
      setActiveTip(null);
    } else {
      setPhase('summary');
    }
  }, [currentQuestionIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setPhase('project');
    setSelectedProject(null);
    setSelectedScale(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectionTrail([]);
    setOptionStates({});
    setAttempts(0);
    setFeedbackMessage(null);
    setAnswered(false);
    setActiveTip(null);
  }, []);

  if (phase === 'summary') {
    return (
      <QuizSummary
        projectType={selectedProject!}
        scale={selectedScale!}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <ProgressTracker groups={progressGroups} />

      <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 pb-8">
        <div ref={contentRef} className="w-full max-w-lg animate-slide-up">
          {/* Phase: Project Selection */}
          {phase === 'project' && (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  System Design Quiz
                </h1>
                <p className="text-muted-foreground">
                  What type of project are you designing?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {projectTypes.map(pt => (
                  <QuizCard
                    key={pt.id}
                    label={pt.label}
                    description={pt.description}
                    image={pt.image}
                    size="lg"
                    tip={pt.description}
                    tipActive={activeTip?.id === `project:${pt.id}`}
                    onTipClick={() => setActiveTip({
                      id: `project:${pt.id}`,
                      text: `${pt.description} In this quiz, it also determines the baseline assumptions and trade-offs the questions will focus on.`,
                    })}
                    onClick={() => handleProjectSelect(pt.id)}
                  />
                ))}
              </div>
              {activeTip && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Tip:</p>
                  <div className="rounded-lg border border-info/30 bg-info/10 p-3">
                    <div key={activeTip.id} className="animate-in fade-in-0 duration-200">
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info text-info-foreground text-xs font-bold"
                        >
                          ?
                        </span>
                        <p className="text-sm text-info leading-snug">{activeTip.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Phase: Scale Selection */}
          {phase === 'scale' && (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  What scale are you targeting?
                </h2>
                <p className="text-muted-foreground">
                  This will affect the recommended architecture
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {scaleOptions.map(s => (
                  <QuizCard
                    key={s.id}
                    label={s.label}
                    description={s.description}
                    image={s.image}
                    size="lg"
                    tip={s.description}
                    tipActive={activeTip?.id === `scale:${s.id}`}
                    onTipClick={() => setActiveTip({
                      id: `scale:${s.id}`,
                      text: `${s.description} In this quiz, it changes the scale assumptions behind the recommended architecture trade-offs.`,
                    })}
                    onClick={() => handleScaleSelect(s.id)}
                  />
                ))}
              </div>
              {activeTip && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Tip:</p>
                  <div className="rounded-lg border border-info/30 bg-info/10 p-3">
                    <div key={activeTip.id} className="animate-in fade-in-0 duration-200">
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info text-info-foreground text-xs font-bold"
                        >
                          ?
                        </span>
                        <p className="text-sm text-info leading-snug">{activeTip.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Phase: Quiz Questions */}
          {phase === 'quiz' && currentQuestion && (
            <>
              <div className="mb-2 text-center">
                <span className="text-xs font-medium text-muted-foreground">
                      Step {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="mb-6 text-center">
                <h2 className="text-lg font-bold text-foreground mb-1">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-sm text-muted-foreground">{currentQuestion.subtitle}</p>
                )}
              </div>

              {activeTip && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Tip:</p>
                  <div className="rounded-lg border border-info/30 bg-info/10 p-3">
                    <div key={activeTip.id} className="animate-in fade-in-0 duration-200">
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info text-info-foreground text-xs font-bold"
                        >
                          ?
                        </span>
                        <p className="text-sm text-info leading-snug">{activeTip.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Message */}
              {feedbackMessage && (
                <div className="mt-2">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Your answer:</p>
                  <div className={cn(
                    'rounded-lg border p-3 text-sm animate-scale-in',
                    feedbackMessage.type === 'success'
                      ? 'border-success/30 bg-success/10 text-success'
                      : 'border-destructive/30 bg-destructive/10 text-destructive',
                  )}>
                    <div className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                          feedbackMessage.type === 'success' ? 'bg-success' : 'bg-destructive',
                        )}
                      >
                        {feedbackMessage.type === 'success' ? (
                          <Check className="h-3.5 w-3.5 text-success-foreground" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-destructive-foreground" />
                        )}
                      </span>
                      <p className="leading-snug">{feedbackMessage.text}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs font-semibold text-muted-foreground mt-4 mb-2">Options:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {currentQuestion.options.map(option => (
                  <QuizCard
                    key={option.id}
                    label={option.label}
                    layout="horizontal"
                    leadingVisual={<QuizOptionIcon label={option.label} />}
                    tip={option.explanation}
                    tipActive={activeTip?.id === `quiz:${currentQuestion.id}:${option.id}`}
                    onTipClick={() => setActiveTip({
                      id: `quiz:${currentQuestion.id}:${option.id}`,
                      text: `${option.explanation} In system design terms, this choice typically influences your performance/scaling approach and the operational complexity you’ll need to manage.`,
                    })}
                    onClick={() => handleOptionSelect(option)}
                    state={optionStates[option.id] || 'default'}
                    disabled={answered && optionStates[option.id] !== 'correct'}
                  />
                ))}
              </div>

              {answered && optionStates && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold',
                      'border border-border bg-background text-foreground hover:bg-muted/50 transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    )}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next question' : 'View summary'}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

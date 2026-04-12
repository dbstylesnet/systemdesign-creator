import { useState, useCallback } from 'react';
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

export function QuizFlow() {
  const [phase, setPhase] = useState<Phase>('project');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [selectedScale, setSelectedScale] = useState<ScaleType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [optionStates, setOptionStates] = useState<OptionState>({});
  const [attempts, setAttempts] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [answered, setAnswered] = useState(false);

  const questions = selectedProject && selectedScale
    ? getQuestions(selectedProject, selectedScale)
    : [];

  const currentQuestion = questions[currentQuestionIndex];

  const progressSteps = [
    ...(selectedProject ? [{ label: projectTypes.find(p => p.id === selectedProject)?.label || '' }] : []),
    ...(selectedScale ? [{ label: scaleOptions.find(s => s.id === selectedScale)?.label || '' }] : []),
    ...answers.map(a => {
      const opt = a.question.options.find(o => o.id === a.selectedOptionId);
      return { label: opt?.label || '' };
    }),
  ];

  const handleProjectSelect = useCallback((id: ProjectType) => {
    setSelectedProject(id);
    setPhase('scale');
  }, []);

  const handleScaleSelect = useCallback((id: ScaleType) => {
    setSelectedScale(id);
    setPhase('quiz');
  }, []);

  const handleOptionSelect = useCallback((option: QuizOption) => {
    if (answered) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (option.correct) {
      setOptionStates(prev => ({ ...prev, [option.id]: 'correct' }));
      setFeedbackMessage({ text: `✅ Good choice! ${option.explanation}`, type: 'success' });
      setAnswered(true);

      setAnswers(prev => [...prev, {
        question: currentQuestion!,
        selectedOptionId: option.id,
        correct: true,
        attempts: newAttempts,
      }]);

      // Auto-advance after delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setOptionStates({});
          setAttempts(0);
          setFeedbackMessage(null);
          setAnswered(false);
        } else {
          setPhase('summary');
        }
      }, 2500);
    } else {
      setOptionStates(prev => ({ ...prev, [option.id]: 'incorrect' }));
      setFeedbackMessage({ text: `❌ ${option.explanation}`, type: 'error' });

      // Clear error message after delay
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    }
  }, [answered, attempts, currentQuestion, currentQuestionIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setPhase('project');
    setSelectedProject(null);
    setSelectedScale(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setOptionStates({});
    setAttempts(0);
    setFeedbackMessage(null);
    setAnswered(false);
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
      <ProgressTracker steps={progressSteps} currentStep={progressSteps.length} />

      <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 pb-8">
        <div className="w-full max-w-lg animate-slide-up">
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
                    onClick={() => handleProjectSelect(pt.id)}
                  />
                ))}
              </div>
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
                    onClick={() => handleScaleSelect(s.id)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Phase: Quiz Questions */}
          {phase === 'quiz' && currentQuestion && (
            <>
              <div className="mb-2 text-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
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

              <div className="grid grid-cols-2 gap-3 mb-4">
                {currentQuestion.options.map(option => (
                  <QuizCard
                    key={option.id}
                    label={option.label}
                    onClick={() => handleOptionSelect(option)}
                    state={optionStates[option.id] || 'default'}
                    disabled={answered && optionStates[option.id] !== 'correct'}
                  />
                ))}
              </div>

              {/* Feedback Message */}
              {feedbackMessage && (
                <div className={cn(
                  'rounded-lg border p-3 text-sm animate-scale-in',
                  feedbackMessage.type === 'success'
                    ? 'border-success/30 bg-success/10 text-success'
                    : 'border-destructive/30 bg-destructive/10 text-destructive',
                )}>
                  {feedbackMessage.text}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

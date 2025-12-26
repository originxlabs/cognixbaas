import { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-01-26T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-hero-glow opacity-50" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Official Launch: January 26, 2026
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8">
              <span className="gradient-text">Countdown to Launch</span>
            </h2>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              {timeBlocks.map((block) => (
                <div
                  key={block.label}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-border"
                >
                  <div className="text-3xl md:text-5xl font-black gradient-text font-mono">
                    {String(block.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
                    {block.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Currently in active development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;

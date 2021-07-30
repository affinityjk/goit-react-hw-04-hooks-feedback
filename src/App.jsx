import { useState } from "react";
import Container from "components/Container/Container";
import FeedbackOptions from "components/FeedbackOptions/FeedbackOptions";
import Notification from "components/Notification/Notification";
import Section from "components/Section/Section";
import Statistics from "components/Statistics/Statistics";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const handleIncreaseFeedback = (option) => {
    switch (option) {
      case "good":
        setGood(good => good + 1);
        break;
      case "neutral":
        setNeutral(neutral => neutral + 1);
        break;
      case "bad":
        setBad(bad => bad + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return [good, neutral, bad].reduce((acc, value) => acc + value);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / total) * 100);
  };

  const total = countTotalFeedback();
  const percentage = countPositiveFeedbackPercentage();

  return (
    <Container>
      <Section title="Please leave a feedback">
        <FeedbackOptions
          onLeaveFeedback={handleIncreaseFeedback}
        />
      </Section>

      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="No feedback given" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={percentage}
          />
        )}
      </Section>
    </Container>
  );
}
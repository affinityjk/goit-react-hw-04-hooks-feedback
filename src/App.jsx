import React, { Component } from "react";
import Container from "components/Container/Container";
import FeedbackOptions from "components/FeedbackOptions/FeedbackOptions";
import  Notification from "components/Notification/Notification";
import Section from "components/Section/Section";
import Statistics from "components/Statistics/Statistics";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncreaseFeedback = (option) => {
    this.setState((prevState) => {
      return { [option]: prevState[option] + 1 };
    });
  };

  countTotalFeedback = () => {
    const feedbacksAmount = Object.values(this.state);
    return feedbacksAmount.reduce((acc, value) => acc + value);
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();

    return Math.round((good / total) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <Container>
        <Section title="Please leave a feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleIncreaseFeedback}
          />
        </Section>

        <Section title="Statistics">
          {totalFeedback === 0 ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </Container>
    );
  }
}

export default App;

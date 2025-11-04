import React from "react";
import type { StepperProps } from "./Stepper.types";
import styles from "./Stepper.module.css";

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  className,
}) => (
  <div
    className={`${styles.stepper} ${styles[orientation]} ${className || ""}`}
  >
    {steps.map((step, index) => (
      <div
        key={index}
        className={`${styles.step} ${
          index === currentStep ? styles.active : ""
        } ${step.completed ? styles.completed : ""}`}
        onClick={() => onStepClick?.(index)}
      >
        <div className={styles.indicator}>
          {step.completed ? "✓" : index + 1}
        </div>
        <div className={styles.content}>
          <div className={styles.label}>{step.label}</div>
          {step.description && (
            <div className={styles.description}>{step.description}</div>
          )}
        </div>
        {index < steps.length - 1 && <div className={styles.connector} />}
      </div>
    ))}
  </div>
);

Stepper.displayName = "Stepper";

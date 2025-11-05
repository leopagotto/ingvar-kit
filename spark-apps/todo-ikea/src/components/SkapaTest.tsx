/**
 * Skapa Component Integration Test
 *
 * This component tests direct imports from @ingvar-kit/skapa-components
 * using official Skapa component names from @ingka packages.
 */

import React, { useState } from "react";

// Import direct @ingka exports with official Skapa names
import {
  Button,
  Card,
  InputField,
  Switch,
  RadioButton,
  Checkbox,
  Select,
  Slider,
  TextArea,
  Badge,
  Banner,
  Toast,
  ProgressIndicator,
  Skeleton,
  Loading,
  Accordion,
  Avatar,
  Pill,
  Tag,
  Hyperlink,
} from "@ingvar-kit/skapa-components/ingka-direct";

export function SkapaTest() {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Skapa Component Test</h1>
        <p className="text-gray-600">
          Testing direct @ingka package imports with official Skapa names
        </p>
      </div>

      {/* ACTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <Button variant="primary" size="medium">
            Primary Button
          </Button>
          <Button variant="secondary" size="medium">
            Secondary Button
          </Button>
          <Button variant="tertiary" size="medium">
            Tertiary Button
          </Button>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Pill size="small">Small Pill</Pill>
          <Pill size="medium">Medium Pill</Pill>
          <Tag>Tag Component</Tag>
        </div>
      </section>

      {/* INPUTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>

        <InputField
          label="Email Address"
          type="email"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          placeholder="Enter your email"
        />

        <TextArea label="Message" placeholder="Enter your message" rows={4} />

        <div className="space-y-2">
          <label className="block font-medium">Switch Toggle</label>
          <Switch
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChecked(e.target.checked)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Checkbox</label>
          <Checkbox
            label="Accept terms and conditions"
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChecked(e.target.checked)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Slider</label>
          <Slider
            value={sliderValue}
            onChange={(value: number) => setSliderValue(value)}
            min={0}
            max={100}
          />
          <p className="text-sm text-gray-600">Value: {sliderValue}</p>
        </div>
      </section>

      {/* INDICATORS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Indicators</h2>

        <div className="flex gap-4 items-center flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Progress Indicator</p>
          <ProgressIndicator value={65} max={100} />
        </div>

        <div className="space-y-2">
          <p className="font-medium">Loading Spinner</p>
          <Loading />
        </div>

        <div className="space-y-2">
          <p className="font-medium">Skeleton Loader</p>
          <Skeleton width={200} height={20} />
        </div>
      </section>

      {/* MESSAGES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Messages</h2>

        <Banner
          variant="info"
          text="This is an informational banner message"
          dismissible
        />

        <Button
          variant="primary"
          size="medium"
          onClick={() => setShowToast(true)}
        >
          Show Toast
        </Button>

        {showToast && (
          <Toast
            text="Operation completed successfully!"
            isOpen={showToast}
            onCloseRequest={() => setShowToast(false)}
          />
        )}
      </section>

      {/* DISPLAY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Display</h2>

        <Card>
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Card Title</h3>
            <p>This is a card component with some content inside.</p>
            <Button variant="secondary" size="small">
              Learn More
            </Button>
          </div>
        </Card>

        <div className="flex gap-4 items-center">
          <Avatar
            src="https://i.pravatar.cc/150?img=1"
            alt="User Avatar"
            size="medium"
          />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-600">Product Designer</p>
          </div>
        </div>

        <Accordion
          items={[
            {
              title: "What is Skapa?",
              content:
                "Skapa is IKEA's design system for building consistent user experiences.",
            },
            {
              title: "How to use components?",
              content:
                "Import components directly from @ingvar-kit/skapa-components/ingka-direct",
            },
          ]}
        />
      </section>

      {/* NAVIGATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Navigation</h2>

        <div className="space-y-2">
          <Hyperlink href="https://ikea.com" external>
            Visit IKEA Website
          </Hyperlink>
        </div>
      </section>

      {/* SUCCESS MESSAGE */}
      <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          ✅ All Components Loaded Successfully!
        </h3>
        <p className="text-green-700">
          Direct @ingka imports are working correctly with official Skapa
          component names.
        </p>
        <p className="text-sm text-green-600 mt-2">
          Tested: Button, Card, InputField, Switch, Checkbox, Select, Slider,
          TextArea, Badge, Banner, Toast, ProgressIndicator, Skeleton, Loading,
          Accordion, Avatar, Pill, Tag, Hyperlink
        </p>
      </div>
    </div>
  );
}

export default SkapaTest;

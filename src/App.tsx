import { useState } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';

function App() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSimulateLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Layout
      projectName="KodNest Design System"
      stepCurrent={1}
      stepTotal={5}
      status="In Progress"
      title="Component Showcase"
      subtitle="A demonstration of the calm, intentional, and coherent design system."
    >
      <div className="flex flex-col gap-8">

        {/* Buttons Section */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-4">Buttons</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <Button onClick={handleSimulateLoad} isLoading={loading}>
                Primary Button
              </Button>
              <Button variant="secondary" onClick={handleSimulateLoad} isLoading={loading}>
                Secondary Button
              </Button>
              <Button variant="text">
                Text Button
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
              <h3 className="text-sm font-semibold mb-2">Disabled States</h3>
              <div className="flex gap-4">
                <Button disabled>Primary Disabled</Button>
                <Button variant="secondary" disabled>Secondary Disabled</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-4">Inputs</h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Project Name"
                placeholder="e.g. KodNest Job Tracker"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="This will be displayed in the top bar."
              />

              <Input
                label="Error State Example"
                placeholder="Invalid input..."
                error="This field is required."
              />

              <Input
                label="Disabled Input"
                disabled
                value="Cannot edit this"
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Simple Card">
              <p className="text-[var(--text-muted)]">
                This usage of the card component demonstrates the clean borders and lack of drop shadows, aligning with the calm design philosophy.
              </p>
            </Card>

            <Card
              title="Card with Footer"
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="text" size="sm">Cancel</Button>
                  <Button size="sm">Save Changes</Button>
                </div>
              }
            >
              <p className="text-[var(--text-primary)]">
                Cards can contain interactive elements and footer actions. The whitespace is intentional and generous.
              </p>
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-4">Typography & Spacing</h2>
          <Card className="space-y-4">
            <div>
              <h1 className="text-4xl font-serif font-bold">Heading 1 (Serif)</h1>
              <p className="text-sm text-gray-500">Font: Merriweather, 2.5rem, Bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold">Heading 2 (Serif)</h2>
              <p className="text-sm text-gray-500">Font: Merriweather, 2rem, Bold</p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold">Heading 3 (Serif)</h3>
              <p className="text-sm text-gray-500">Font: Merriweather, 1.75rem, Bold</p>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)]">
              <p className="leading-relaxed text-[var(--text-primary)] max-w-[var(--max-width-text)]">
                <strong>Body Text (Inter):</strong> clean sans-serif, 16–18px, line-height 1.6. The spacing system uses a consistent scale (8px, 16px, 24px, 40px, 64px) to ensure rhythm and coherence. We avoid random pixel values to maintain visual integrity.
              </p>
            </div>
          </Card>
        </section>

      </div>
    </Layout>
  );
}

export default App;

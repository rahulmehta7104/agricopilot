import { useState } from "react";
import { Button, Input, Modal, toast, Loader, Skeleton, Card } from "../components/ui";

export default function ComponentDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Component Library</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Reusable enterprise-grade UI components for AgriCopilot.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Buttons</h2>
        
        <Card className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled Button</Button>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Inputs</h2>
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input 
            label="Default Input" 
            placeholder="Enter something..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input 
            label="Input with Error" 
            placeholder="Invalid value..." 
            error="This field is required and must be valid."
            defaultValue="wrong@email"
          />
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Modals & Overlays</h2>
        <Card className="flex gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title="Update Configuration"
          >
            <div className="py-4 space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                Are you sure you want to update the AI Copilot configuration? This will affect new predictions.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
              </div>
            </div>
          </Modal>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Toasts</h2>
        <Card className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            className="border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-400"
            onClick={() => toast.success("Operation completed successfully!")}
          >
            Success Toast
          </Button>
          <Button 
            variant="outline" 
            className="border-red-200 text-red-700 dark:border-red-900 dark:text-red-400"
            onClick={() => toast.error("Something went wrong. Please try again.")}
          >
            Error Toast
          </Button>
          <Button 
            variant="outline" 
            className="border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-400"
            onClick={() => toast.info("New updates are available.")}
          >
            Info Toast
          </Button>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Loaders & Skeletons</h2>
        <Card className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Spinner</h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-center">
              <Loader />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Skeleton State</h3>
            <div className="space-y-3">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

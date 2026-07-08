import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm as useReactHookForm } from 'react-hook-form';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import api from '../../api/axios';

interface ApplicationFormData {
  universityName: string;
  program: string;
  deadline: string;
  type: string;
  notes: string;
}

const NewApplication = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useReactHookForm<ApplicationFormData>({
    defaultValues: {
      type: 'regular_decision'
    }
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await api.post('/applications', data);
      if (response.data.success) {
        navigate('/applications');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/applications" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">New Application</h1>
          <p className="text-muted-foreground">Add a new college application to your tracker.</p>
        </div>
      </div>

      <div className="glass-card p-8 rounded-xl border border-white/5">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">University Name</label>
              <input
                type="text"
                {...register('universityName', { required: 'University name is required' })}
                placeholder="e.g. Stanford University"
                className="w-full bg-[#0A0F1F] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
              {errors.universityName && <p className="text-xs text-red-400">{errors.universityName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Program / Major</label>
              <input
                type="text"
                {...register('program', { required: 'Program is required' })}
                placeholder="e.g. Computer Science (B.S.)"
                className="w-full bg-[#0A0F1F] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
              {errors.program && <p className="text-xs text-red-400">{errors.program.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Application Deadline</label>
              <input
                type="date"
                {...register('deadline', { required: 'Deadline is required' })}
                className="w-full bg-[#0A0F1F] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
              {errors.deadline && <p className="text-xs text-red-400">{errors.deadline.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Application Type</label>
              <select
                {...register('type', { required: 'Application type is required' })}
                className="w-full bg-[#0A0F1F] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="regular_decision">Regular Decision</option>
                <option value="early_decision">Early Decision</option>
                <option value="early_action">Early Action</option>
                <option value="rolling">Rolling Admission</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Notes (Optional)</label>
            <textarea
              {...register('notes')}
              placeholder="Add any specific requirements, essay topics, or personal notes here..."
              rows={4}
              className="w-full bg-[#0A0F1F] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/applications')}
              className="px-6 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-primary-foreground px-6 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewApplication;

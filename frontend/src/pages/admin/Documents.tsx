import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download, Search, Filter, Plus, Eye, Calendar, File } from 'lucide-react';

interface Document {
  _id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  category: string;
  downloadUrl: string;
}

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data - replace with actual API call
  const documents: Document[] = [
    {
      _id: '1',
      title: 'College Application Guide 2024',
      description: 'Comprehensive guide for college applications',
      fileName: 'college_guide_2024.pdf',
      fileSize: 2450000,
      uploadDate: '2024-01-15',
      category: 'guides',
      downloadUrl: '#'
    },
    {
      _id: '2',
      title: 'Scholarship Application Forms',
      description: 'Common scholarship application templates',
      fileName: 'scholarship_forms.pdf',
      fileSize: 1200000,
      uploadDate: '2024-02-20',
      category: 'forms',
      downloadUrl: '#'
    },
    {
      _id: '3',
      title: 'Financial Aid Documentation',
      description: 'Required documents for financial aid',
      fileName: 'financial_aid_docs.pdf',
      fileSize: 3100000,
      uploadDate: '2024-03-10',
      category: 'financial',
      downloadUrl: '#'
    },
    {
      _id: '4',
      title: 'Essay Writing Tips',
      description: 'Tips and examples for college essays',
      fileName: 'essay_tips.pdf',
      fileSize: 890000,
      uploadDate: '2024-04-05',
      category: 'guides',
      downloadUrl: '#'
    }
  ];

  const categories = ['all', 'guides', 'forms', 'financial', 'transcripts', 'other'];

  const filteredDocuments = documents.filter(doc =>
    (selectedCategory === 'all' || doc.category === selectedCategory) &&
    (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'guides': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'forms': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'financial': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'transcripts': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setShowUploadModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Document Manager</h1>
          <p className="text-slate-400 mt-1">Upload and manage PDF documents</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-[#A5B4FC] hover:bg-[#93A5F8] text-slate-900 font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Upload Document
        </button>
      </div>

      {/* Search and Filters */}
      <div className="glass-card rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-slate-900">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <FileText size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No documents found matching your criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc._id} className="glass-card rounded-xl p-6 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <File size={24} className="text-red-400" />
                </div>
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full ${getCategoryColor(doc.category)}`}>
                  {doc.category}
                </span>
              </div>

              <h4 className="font-bold text-lg text-white mb-2 line-clamp-1">{doc.title}</h4>
              <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2">{doc.description}</p>
              
              <div className="flex justify-between text-xs text-slate-300 mb-4 border-t border-white/10 pt-4">
                <div>
                  <span className="block text-slate-500 mb-1">Size:</span>
                  <span className="font-medium text-white">{formatFileSize(doc.fileSize)}</span>
                </div>
                <div className="text-right">
                  <span className="block text-slate-500 mb-1">Uploaded:</span>
                  <span className="font-medium text-white">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Eye size={14} />
                  Preview
                </button>
                <button className="flex-1 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Upload Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Document Title</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none"
                  placeholder="Enter document description"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Category</label>
                <select
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                >
                  {categories.filter(c => c !== 'all').map(cat => (
                    <option key={cat} value={cat} className="bg-slate-900">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">File</label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                  <Upload size={32} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">PDF files only (Max 10MB)</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-2.5 bg-[#A5B4FC] hover:bg-[#93A5F8] text-slate-900 font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;

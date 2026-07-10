import React, { useState } from 'react';
<<<<<<< HEAD
import { UploadCloud, FileText, Trash2, CheckCircle2, FileImage, File } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
}

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'High_School_Transcript.pdf',
      size: '2.4 MB',
      type: 'pdf',
      uploadDate: new Date().toISOString()
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  const handleFiles = (files: File[]) => {
    const newDocs = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.name.split('.').pop() || 'unknown',
      uploadDate: new Date().toISOString()
    }));
    
    setDocuments(prev => [...newDocs, ...prev]);
  };
  
  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  
  const getFileIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf': return <FileText className="text-red-400" size={24} />;
      case 'png':
      case 'jpg':
      case 'jpeg': return <FileImage className="text-blue-400" size={24} />;
      default: return <File className="text-slate-400" size={24} />;
=======
import { FileText, Download, Search, Calendar, File, CheckCircle2, AlertCircle, Upload, Plus, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Document {
  _id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  category: string;
  downloadUrl: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
}

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState<Document | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Use React state to make document uploads interactive and persistent across renders
  const [documents, setDocuments] = useState<Document[]>([
    {
      _id: '1',
      title: 'Class 10th & 12th Mark Sheets',
      description: 'Official mark sheets from CBSE/State Board',
      fileName: 'mark_sheets.pdf',
      fileSize: 2450000,
      uploadDate: '2024-01-15',
      category: 'academic',
      downloadUrl: '#',
      required: true,
      status: 'uploaded'
    },
    {
      _id: '2',
      title: 'JEE Main/Advanced Score Card',
      description: 'Official JEE score card from NTA',
      fileName: 'jee_scores.pdf',
      fileSize: 890000,
      uploadDate: '2024-02-20',
      category: 'academic',
      downloadUrl: '#',
      required: true,
      status: 'approved'
    },
    {
      _id: '3',
      title: 'Statement of Purpose (SOP)',
      description: 'Your college application essay/SOP',
      fileName: 'sop.pdf',
      fileSize: 120000,
      uploadDate: '2024-03-10',
      category: 'essay',
      downloadUrl: '#',
      required: true,
      status: 'pending'
    },
    {
      _id: '4',
      title: 'Letters of Recommendation',
      description: 'Recommendation letters from teachers/principal',
      fileName: 'recommendations.pdf',
      fileSize: 3100000,
      uploadDate: '2024-04-05',
      category: 'recommendation',
      downloadUrl: '#',
      required: true,
      status: 'pending'
    },
    {
      _id: '5',
      title: 'Caste/Income Certificate',
      description: 'Caste certificate and income certificate for reservation',
      fileName: 'certificates.pdf',
      fileSize: 1500000,
      uploadDate: '2024-04-15',
      category: 'financial',
      downloadUrl: '#',
      required: false,
      status: 'pending'
    },
    {
      _id: '6',
      title: 'Aadhaar Card',
      description: 'Aadhaar card for identity verification',
      fileName: 'aadhaar.pdf',
      fileSize: 500000,
      uploadDate: '2024-04-20',
      category: 'identity',
      downloadUrl: '#',
      required: true,
      status: 'uploaded'
    }
  ]);

  const categories = ['all', 'academic', 'essay', 'recommendation', 'financial', 'identity', 'other'];

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

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'uploaded': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'rejected': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle2;
      case 'rejected': return AlertCircle;
      default: return Calendar;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'academic': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'essay': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'recommendation': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'financial': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'identity': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const requiredDocs = documents.filter(doc => doc.required).length;
  const uploadedDocs = documents.filter(doc => doc.status === 'uploaded' || doc.status === 'approved').length;

  const handleUploadClick = (doc: Document) => {
    setUploadingDoc(doc);
    setSelectedFile(null);
    setShowUploadModal(true);
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const response = await fetch('/api/upload/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      
      // Update document status in state
      if (uploadingDoc) {
        setDocuments(prev => prev.map(d => 
          d._id === uploadingDoc._id 
            ? { 
                ...d, 
                status: 'uploaded', 
                fileName: result.data.original_name, 
                downloadUrl: result.data.url,
                fileSize: result.data.size,
                uploadDate: new Date().toISOString().split('T')[0]
              }
            : d
        ));
      }
      
      setIsUploading(false);
      setShowUploadModal(false);
      setUploadingDoc(null);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      alert('Failed to upload file. Please try again.');
>>>>>>> 5e4cc07 (update ui and functionallity)
    }
  };

  return (
<<<<<<< HEAD
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
        <p className="text-muted-foreground">Manage your transcripts, essays, and letters of recommendation.</p>
        <div className="mt-4 p-3 rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-500 text-sm flex items-start gap-2 max-w-2xl">
          <span className="font-bold">Note:</span> 
          <span>Document storage is currently in preview mode. Files are not permanently saved to the backend yet.</span>
        </div>
      </div>

      <div 
        className={`glass-card p-10 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-primary">
          <UploadCloud size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Upload new document</h3>
        <p className="text-muted-foreground mb-6">Drag and drop your files here, or click to browse.</p>
        
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          multiple
          onChange={handleFileInput}
        />
        
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors font-medium">
          Browse Files
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Your Files</h2>
        
        {documents.length === 0 ? (
          <div className="text-center py-12 border border-white/5 rounded-xl">
            <p className="text-slate-500">No documents uploaded yet.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0A0F1F] flex items-center justify-center border border-white/10">
                    {getFileIcon(doc.type)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm md:text-base line-clamp-1">{doc.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden md:flex items-center gap-1.5 text-emerald-500 text-xs bg-emerald-500/10 px-2 py-1 rounded-md">
                    <CheckCircle2 size={14} />
                    <span>Ready</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDocument(doc.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
=======
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Documents</h1>
          <p className="text-slate-400 mt-1">Manage your application documents</p>
        </div>
        <div className="text-sm text-slate-400">
          {uploadedDocs} of {requiredDocs} required documents uploaded
        </div>
      </div>

      {/* Progress Card */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Document Progress</h3>
          <span className="text-2xl font-bold text-cyan-400">{Math.round((uploadedDocs / requiredDocs) * 100)}%</span>
        </div>
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500" 
            style={{ width: `${(uploadedDocs / requiredDocs) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          {requiredDocs - uploadedDocs} required document(s) remaining
        </p>
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
          {filteredDocuments.map((doc) => {
            const StatusIcon = getStatusIcon(doc.status);
            
            return (
              <div key={doc._id} className="glass-card rounded-xl p-6 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <File size={24} className="text-red-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {doc.required && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Required
                      </span>
                    )}
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full ${getStatusColor(doc.status)} flex items-center gap-1`}>
                      <StatusIcon size={10} />
                      {doc.status}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-lg text-white mb-2 line-clamp-1">{doc.title}</h4>
                <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2">{doc.description}</p>
                
                <div className="flex justify-between text-xs text-slate-300 mb-4 border-t border-white/10 pt-4">
                  <div>
                    <span className="block text-slate-500 mb-1">Size:</span>
                    <span className="font-medium text-white">{formatFileSize(doc.fileSize)}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-slate-500 mb-1">Category:</span>
                    <span className={`font-medium ${getCategoryColor(doc.category).split(' ')[0]}`}>
                      {doc.category}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => doc.status === 'pending' ? handleUploadClick(doc) : null}
                  className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {doc.status === 'pending' ? <Upload size={16} /> : <Download size={16} />}
                  {doc.status === 'pending' ? 'Upload Document' : 'View Document'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && uploadingDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Upload Document</h3>
              <button
                onClick={() => { setShowUploadModal(false); setUploadingDoc(null); }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-1">{uploadingDoc.title}</h4>
              <p className="text-sm text-slate-400">{uploadingDoc.description}</p>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Select File</label>
                <label 
                  htmlFor="file-upload" 
                  className="block border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-indigo-500/50 transition-colors cursor-pointer"
                >
                  <Upload size={32} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG files only (Max 10MB)</p>
                  <input 
                    id="file-upload"
                    type="file" 
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                    onChange={(e) => {
                      const input = e.target as HTMLInputElement;
                      if (input.files && input.files[0]) {
                        const file = input.files[0];
                        if (file.size > 10 * 1024 * 1024) {
                          alert('File size must be less than 10MB');
                          input.value = '';
                          setSelectedFile(null);
                        } else {
                          setSelectedFile(file);
                        }
                      }
                    }}
                  />
                </label>
                {selectedFile && (
                  <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs text-slate-300">
                    <span className="truncate max-w-[240px] font-medium text-white">{selectedFile.name}</span>
                    <span className="text-slate-500">{formatFileSize(selectedFile.size)}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowUploadModal(false); setUploadingDoc(null); }}
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
>>>>>>> 5e4cc07 (update ui and functionallity)
    </div>
  );
};

<<<<<<< HEAD
export default DocumentsPage;
=======
export default Documents;
>>>>>>> 5e4cc07 (update ui and functionallity)

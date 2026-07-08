import React, { useState } from 'react';
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
    }
  };

  return (
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
    </div>
  );
};

export default DocumentsPage;

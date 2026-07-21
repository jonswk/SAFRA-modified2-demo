import React from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, ExternalLink, AlertTriangle, Info } from 'lucide-react';

interface FeedbackPageProps {
  article: {
    url: string;
    id: string;
    title: string;
  };
  isInIframe: boolean;
}

export default function FeedbackPage({ article, isInIframe }: FeedbackPageProps) {
  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8" id="feedback-page-wrapper">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
            <div className="flex items-start gap-4">
              <div className="bg-rose-50 text-rose-600 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full tracking-wide uppercase">COMMUNITY</span>
                  Portal Feedback & Suggestions
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  We value your thoughts on the newly designed SAFRA Portal interface, registration flow, and Singpass integrations.
                </p>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 self-start sm:self-auto flex items-center gap-2 shadow-xs shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <CommentCount
                shortname="https-safra-modified2-demo-vercel-app"
                config={{
                  url: article.url,
                  identifier: article.id,
                  title: article.title,
                }}
              >
                {/* Placeholder Text */}
                Comments
              </CommentCount>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Who is this forum for?</span>
                <p className="mt-1 leading-relaxed text-slate-500">
                  All SAFRA members, prospective sign-ups, and beta testers. Share comments, report bugs, or request features directly.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Moderation Guidelines</span>
                <p className="mt-1 leading-relaxed text-slate-500">
                  Be constructive and respectful. Do not post sensitive personal data (such as full NRIC details or passwords).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Sandbox warning if app is running in iframe */}
        {isInIframe && (
          <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="font-bold text-amber-950 text-sm">Preview Frame Cookie Restriction Active</h4>
                <p className="mt-1 text-amber-800 leading-relaxed max-w-2xl">
                  Disqus comments require third-party cookies and local storage access to authenticate sessions. Since this application is currently embedded in a workspace iframe, your browser might block Disqus from loading or allowing you to write comments.
                </p>
                <p className="mt-2 font-bold text-amber-900">
                  👉 If the Disqus widget below is blank, please open the app in a new tab using the button to the right.
                </p>
              </div>
            </div>
            <a
              href={typeof window !== 'undefined' ? window.location.href : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-lg shadow-sm text-center transition-colors flex items-center justify-center gap-1.5"
            >
              Open in New Tab <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Disqus Forum Embedding Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8" id="disqus-container-box">
          <h3 className="text-sm font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 uppercase tracking-wider">
            Discussion Thread
          </h3>
          <div className="min-h-[400px]">
            <DiscussionEmbed
              shortname="https-safra-modified2-demo-vercel-app"
              config={{
                url: article.url,
                identifier: article.id,
                title: article.title,
                language: 'en' // e.g. for Traditional Chinese (Taiwan)
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

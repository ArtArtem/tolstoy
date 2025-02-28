import VideoGallery from './video-gallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7F3]">
      <div className="sticky top-0 left-0 w-full shadow-md z-50 bg-[#F8F7F3]">
        <div className="flex items-center justify-between">

          <a href="https://www.gotolstoy.com/">
            <div className="inline-block p-3 bg-primary/10 rounded-full m-4 flex gap-5 w-fit">
              <img src="https://cdn.prod.website-files.com/6080285e10b3ca5844aecb46/6336ac285bf8c22401741036_logomark.svg"
                   loading="lazy" alt="" className="img-full" />
              <img src="https://cdn.prod.website-files.com/6080285e10b3ca5844aecb46/6336ac285bf8c20b5e741035_logotype.svg"
                   loading="lazy" alt="" className="img-full" />
            </div>
          </a>

          <a href="https://www.gotolstoy.com/contact-sales">
            <p className="text-xl p-3">Contact sales</p>
          </a>

        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Video Gallery</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload, store, and watch your videos in one place. Drag and drop your files to get started.
          </p>
        </div>

        <VideoGallery />
      </div>
    </main>
  );
}
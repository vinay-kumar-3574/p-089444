
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  backgroundImage?: string;
}

const testimonials: TestimonialProps[] = [
  {
    content: "I got mentored by a senior from Google through CampusConnect. Incredible experience.",
    author: "Riya",
    role: "B.Tech 2022",
    backgroundImage: "/background-section1.png"
  },
  {
    content: "Finally a platform where alumni actually respond and help. Clean, fast, and smart.",
    author: "Arjun",
    role: "MBA 2021",
    backgroundImage: "/background-section2.png"
  },
  {
    content: "As an admin, the auto email feature saved us hours every week.",
    author: "Priya",
    role: "Placement Cell",
    backgroundImage: "/background-section3.png"
  },
  {
    content: "The AI event recommendations helped me discover opportunities I would have never found otherwise.",
    author: "Karan",
    role: "M.Tech 2023",
    backgroundImage: "/background-section1.png"
  },
  {
    content: "Connected with 5 alumni in my field within the first week. Game changer for networking.",
    author: "Sneha",
    role: "B.Com 2020",
    backgroundImage: "/background-section2.png"
  },
  {
    content: "The mentorship quality is outstanding. My mentor helped me land my dream internship.",
    author: "Rohit",
    role: "BCA 2023",
    backgroundImage: "/background-section3.png"
  },
  {
    content: "Event notifications are perfectly timed and relevant. Never miss important opportunities now.",
    author: "Ananya",
    role: "M.Sc 2022",
    backgroundImage: "/background-section1.png"
  },
  {
    content: "The dashboard analytics help us track student engagement like never before.",
    author: "Dr. Sharma",
    role: "Faculty Coordinator",
    backgroundImage: "/background-section2.png"
  },
  {
    content: "Alumni engagement increased by 300% after implementing CampusConnect AI.",
    author: "Rajesh",
    role: "Alumni Relations",
    backgroundImage: "/background-section3.png"
  },
  {
    content: "Best investment our university made. Students are more connected than ever.",
    author: "Prof. Gupta",
    role: "Dean Student Affairs",
    backgroundImage: "/background-section1.png"
  }
];

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png"
}: TestimonialProps) => {
  return (
    <div 
      className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden min-h-[280px]" 
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentTestimonials = () => {
    const start = currentIndex * testimonialsPerPage;
    return testimonials.slice(start, start + testimonialsPerPage);
  };

  return (
    <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Testimonials</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-display font-bold text-left">What students & alumni say</h2>
          
          <div className="flex items-center gap-4">
            <button
              onClick={prevTestimonials}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-gray-500 font-medium">
              {currentIndex + 1} / {totalPages}
            </span>
            <button
              onClick={nextTestimonials}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
              disabled={currentIndex === totalPages - 1}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500">
          {getCurrentTestimonials().map((testimonial, index) => (
            <TestimonialCard 
              key={`${currentIndex}-${index}`}
              content={testimonial.content} 
              author={testimonial.author} 
              role={testimonial.role} 
              backgroundImage={testimonial.backgroundImage} 
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-pulse-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

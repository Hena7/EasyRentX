import React from "react";

const testimonials = [
  {
    quote:
      "EasyRentX made it so simple to find and rent a car for my vacation. The process was smooth and the car was exactly as described.",
    author: "Alem Desta",
    role: "Renter",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 5,
  },
  {
    quote:
      "As a property owner, I've been able to earn extra income by renting out my vacation home when I'm not using it. The platform is user-friendly and secure.",
    author: "Mikiale Getachew",
    role: "Owner",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 5,
  },
  {
    quote:
      "I needed a professional camera for a weekend event and found exactly what I needed on EasyRentX. Saved me hundreds of dollars compared to buying one!",
    author: "Kibrom Abebe",
    role: "Renter",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 4,
  },
];


const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
      ★
    </span>
  ));
  
};

export default function Testimonials() {
  return (
    <section className="pt-16 bg-muted/50 w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Hear from renters and owners who have used our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border p-10 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-2xl dark:hover:shadow-blue-900/40 transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="star-rating">
                {renderStars(testimonial.rating)}
              </div>
              <div className="flex mb-4"></div>
              <p className="mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
                                       <div className="h-full bg-[#FBFDFC] overflow-y-auto flex justify-center font-['Geist']">
                <div className="flex justify-center px-4 py-4" style={{ width: '880px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ gridTemplateColumns: '272px 272px 272px' }}>
            {/* First Column - Food */}
            <div className="space-y-4">
                           {/* Food Exploration */}
               <div className="bg-[#00402008] rounded-[6px] p-4 w-68 mx-auto">
                                   <p className="text-[#000A07A0] text-sm leading-relaxed mb-4">
                    I love <span className="font-medium text-[#000805E5]">exploring food spots</span> in San Francisco Bay Area! An interesting snack that I recently tried is tanghulu, rock sugar-coated fruits. Definitely worth trying once with friends!
                  </p>
                 <img 
                   src="/tanghulu.gif" 
                   alt="Aaron trying tanghulu for the first time" 
                   className="w-60 h-90 object-cover rounded-lg"
                 />
               </div>
            </div>

            {/* Second Column - Work & Books */}
            <div className="space-y-4">
                             {/* Current Work */}
               <div className="bg-[#00402008] rounded-[6px] p-4">
                                                                 <p className="text-[#000A07A0] text-sm leading-relaxed mb-4">
                   <span className="font-medium text-[#000805E5]">Currently</span>, I work as a product designer at Clari, helping salespeople close more deals.
                 </p>
                                   <div className="flex items-center">
                    <img src="/clari.svg" alt="Clari" className="h-7" />
                  </div>
               </div>

                                                           {/* Previous Work */}
                <div className="bg-[#00402008] rounded-[6px] pt-4 px-4 pb-2">
                                                                                                                                   <p className="text-[#000A07A0] text-sm leading-relaxed mb-2">
                   <span className="font-medium text-[#000805E5]">Previously</span>, I worked as a software engineer at PARC, A Xerox Company for five years, turning AI research into functional prototypes. During college, I also worked as a teaching assistant teaching software engineering principles.
                 </p>
                                   <div className="flex items-center space-x-4">
                    <img src="/parc.svg" alt="PARC" className="h-6" />
                    <div className="pb-[22px]">
                      <img src="/tudelft.svg" alt="TU Delft" className="h-[30px]" />
                    </div>
                  </div>
               </div>

                             {/* Favorite Product Books */}
               <div className="bg-[#00402008] rounded-[6px] p-4">
                                <h3 className="text-[#000A07A0] text-sm font-medium mb-4">My favorite product books.</h3>
                                                                                                                                               <div className="grid grid-cols-2 gap-[10px]">
                      <img 
                        src="/discoveryhabits.png" 
                        alt="Continuous Discovery Habits by Teresa Torres" 
                        className="w-full h-[174px] object-cover rounded-[6px]"
                      />
                      <img 
                        src="/momtest.png" 
                        alt="The Mom Test by Rob Fitzpatrick" 
                        className="w-full h-[174px] object-cover rounded-[6px]"
                      />
                    </div>
               </div>
            </div>

            {/* Third Column - Hobbies & Health */}
            <div className="space-y-4">
                             {/* Board Games */}
               <div className="bg-[#00402008] rounded-[6px] p-4">
                                                                <p className="text-[#000A07A0] text-sm leading-relaxed">
                    To decompress, I love to <span className="font-medium text-[#000805E5]">play board games</span> with friends. I own 60+ board games and the collection is ever-growing. Decrypto is my go-to for big groups.
                  </p>
               </div>

                             {/* Health & Fitness */}
               <div className="bg-[#00402008] rounded-[6px] p-4">
                                                                <p className="text-[#000A07A0] text-sm leading-relaxed">
                    To stay healthy, I go to the gym to <span className="font-medium text-[#000805E5]">lift weights</span> and <span className="font-medium text-[#000805E5]">climb indoors</span>. My goal is to climb outdoors more often.
                  </p>
               </div>
            </div>
          </div>
        </div>
     </div>
  )
} 
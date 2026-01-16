export function Footer() {
    return (
        <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-serif font-bold">GolfScoti</h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                            The ultimate decision-support platform for planning your dream golf trip to Scotland.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">Explore Courses</a></li>
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">Membership</a></li>
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">Trip Planner</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">Partners</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#2dc653] transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; {new Date().getFullYear()} GolfScoti. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {/* Social placeholders */}
                        <span>Twitter</span>
                        <span>Instagram</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

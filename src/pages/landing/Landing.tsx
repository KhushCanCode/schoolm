import { ArrowRight, BarChart3, Bell, BookOpen, Calendar, CheckCircle2, ClipboardList, Cloud, DollarSign, Facebook, GraduationCap, Linkedin, Mail, Settings, Shield, Twitter, Users } from 'lucide-react';

const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">SchoolERP</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
                <a href="#roles" className="text-gray-600 hover:text-blue-600 transition">Modules</a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</a>
                <a href="https://lazfort.com/contactus/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
                <a href="https://erpsystem.lazfort.com/login" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block">
                  Book Demof
                </a>
              </div>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  All-in-One School ERP System for <span className="text-blue-600">Smarter Management</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Manage students, teachers, classes, exams, and fees — everything in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://lazfort.com/contactus/" rel="noopener noreferrer" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center">
                    Book Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-semibold text-center no-underline shadow-sm hover:shadow-md"
                  >
                    Start Free Trial
                  </a>

                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm opacity-90">Total Students</span>
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div className="text-3xl font-bold">2,847</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-sm text-green-700 mb-1">Attendance</div>
                        <div className="text-2xl font-bold text-green-800">94.2%</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <div className="text-sm text-orange-700 mb-1">Fee Collection</div>
                        <div className="text-2xl font-bold text-orange-800">87%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300 rounded-full opacity-30 blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete School Management Platform</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                An all-in-one web system for digital school management with real-time dashboards, secure data, multi-role access, and powerful performance analytics.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud-Based</h3>
                <p className="text-gray-600">Access from anywhere, anytime with secure cloud storage</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
                <p className="text-gray-600">Bank-level security with encrypted data protection</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Role-Based Login</h3>
                <p className="text-gray-600">Custom access for admins, teachers, students, and parents</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customizable</h3>
                <p className="text-gray-600">Adapt the system to match your school's needs</p>
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Role-Based Access Control</h2>
              <p className="text-xl text-gray-600">Tailored dashboards for every user role</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition border-t-4 border-blue-600">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Manage students and teachers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Control classes and exams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Oversee fees and payments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Library, transport & hostel management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">System-wide communication</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition border-t-4 border-green-600">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Accountant Panel</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fee structure management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Track monthly dues</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Process payments and receipts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Extra services billing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Financial reports and analytics</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition border-t-4 border-purple-600">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Teacher Panel</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mark daily attendance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Manage class schedules</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Enter exam marks and grades</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Assign homework and tasks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Communicate with parents</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition border-t-4 border-orange-600">
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Panel</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">View attendance records</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Check exam schedules</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Access report cards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">View fee status</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Read announcements</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition border-t-4 border-pink-600">
                <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Parent Panel</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Track child's performance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Monitor attendance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">View exam results</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Check fee payments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Receive school notifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">No hidden charges. Pay once, scale confidently.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

              {/* BASIC PLAN */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-600 transition">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <p className="text-gray-600 mb-6">For small schools getting started</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">₹4,999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">+ ₹9,999 one-time setup fee</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Up to 500 students</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Student & Teacher modules</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Attendance & Exams tracking</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Basic Fee Management</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Parent access portal</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Email support</li>
                </ul>
                <a href="https://erpsystem.lazfort.com/login" target="_blank" rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-semibold text-center inline-block">
                  Get Started
                </a>
              </div>

              {/* PRO PLAN — BEST DEAL */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl p-8 transform scale-105 relative overflow-hidden">
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
                  Best Deal
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-800/20 to-transparent pointer-events-none"></div>

                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-blue-100 mb-6">For growing institutions ready to automate</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">₹9,999</span>
                  <span className="text-blue-100">/month</span>
                </div>
                <p className="text-sm text-blue-100 mb-6">+ ₹14,999 one-time setup fee</p>

                <ul className="space-y-3 mb-8 text-white">
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Up to 2,000 students</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Admin, Accountant & Teacher panels</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Complete Fee & Payment automation</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Library, Transport & Hostel modules</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Communication & Notification center</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Reports & academic analytics</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Priority support</li>
                </ul>
                <a href="https://erpsystem.lazfort.com/login" target="_blank" rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-center inline-block">
                  Choose Pro Plan
                </a>

                <p className="text-center text-blue-100 mt-4 text-sm italic">
                  Save 15% on annual billing
                </p>
              </div>

              {/* ENTERPRISE PLAN */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-600 transition">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">Tailored for large institutions & universities</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Starting from ₹24,999 setup + custom pricing</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Unlimited students & roles</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Complete ERP suite (Admin, Accountant, Teacher, Student, Parent)</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> AI-driven performance & finance analytics</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Custom integrations & private deployment</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Unlimited storage & backups</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> 24/7 dedicated support & SLA</li>
                </ul>
                <a href="https://lazfort.com/contactus/" target="_blank" rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-semibold text-center inline-block">
                  Contact Sales
                </a>
              </div>
            </div>

            <p className="text-center mt-8 text-gray-600">
              All plans include free onboarding, staff training, and lifetime data ownership.
              <span className="text-blue-600 font-semibold">  Upgrade anytime.</span>
            </p>
          </div>
        </section>


        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Live Dashboard Preview</h2>
              <p className="text-xl text-blue-100">Experience the power of real-time school management</p>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Total Students</p>
                      <p className="text-4xl font-bold">2,847</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                  <p className="text-sm text-blue-100">↑ 12% from last month</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-green-100 text-sm mb-1">Avg Attendance</p>
                      <p className="text-4xl font-bold">94.2%</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-200" />
                  </div>
                  <p className="text-sm text-green-100">↑ 2.4% from last week</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-orange-100 text-sm mb-1">Fee Collection</p>
                      <p className="text-4xl font-bold">87%</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-200" />
                  </div>
                  <p className="text-sm text-orange-100">₹24.5L collected</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Bell className="h-5 w-5 text-blue-600 mr-2" />
                    Recent Notices
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Parent-Teacher Meeting</p>
                        <p className="text-xs text-gray-500">Scheduled for 28th Oct, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Annual Sports Day</p>
                        <p className="text-xs text-gray-500">Registration open until 25th Oct</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Fee Payment Reminder</p>
                        <p className="text-xs text-gray-500">Due date: 30th Oct, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <ClipboardList className="h-5 w-5 text-green-600 mr-2" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Teachers</span>
                      <span className="text-sm font-semibold text-gray-900">148</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Classes</span>
                      <span className="text-sm font-semibold text-gray-900">52</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Library Books</span>
                      <span className="text-sm font-semibold text-gray-900">12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Transport Routes</span>
                      <span className="text-sm font-semibold text-gray-900">18</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">Empower your school with the right plan</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

              {/* BASIC PLAN */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-600 transition">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <p className="text-gray-600 mb-6">Perfect for small schools getting started</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹4,999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Up to 500 students</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Student & Teacher modules</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Attendance & Exam tracking</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Fee collection dashboard</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Parent login access</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Email support</li>
                </ul>
                <a href="https://erpsystem.lazfort.com/login" target="_blank" rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-semibold text-center inline-block">
                  Get Started
                </a>
              </div>

              {/* PRO PLAN */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl p-8 transform scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-blue-100 mb-6">Best for growing institutions</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">₹9,999</span>
                  <span className="text-blue-100">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-white">
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Up to 2,000 students</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Admin, Accountant & Teacher modules</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Fee structure, dues & payments management</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Communication & Notification Center</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Library, Transport & Hostel modules</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Role-based reports & analytics</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-white mr-2" /> Priority email & chat support</li>
                </ul>
                <a href="https://erpsystem.lazfort.com/login" target="_blank" rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-center inline-block">
                  Get Started
                </a>
              </div>

              {/* ENTERPRISE PLAN */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-600 transition">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">Advanced automation for large institutions</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Unlimited students & roles</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Complete ERP suite (Admin, Accountant, Teacher, Student, Parent)</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> AI-based reports & analytics dashboard</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Custom modules (admissions, alumni, transport, etc.)</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> 24/7 dedicated support & training</li>
                  <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-600 mr-2" /> Private cloud deployment option</li>
                </ul>
                <a href="https://lazfort.com/contactus/" target="_blank" rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-semibold text-center inline-block">
                  Contact Sales
                </a>
              </div>
            </div>

            <p className="text-center mt-8 text-gray-600">
              All plans include free onboarding, training, and data migration. Custom integrations and branding available on request.
            </p>
          </div>
        </section>


        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of institutions already using SchoolERP to streamline their operations
            </p>
            <a href="https://lazfort.com/contactus/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold text-lg inline-flex items-center">
              Request a Demo <ArrowRight className="ml-2 h-6 w-6" />
            </a>
            <p className="text-blue-100 mt-6">No credit card required • Free 14-day trial</p>
          </div>
        </section>

        <footer id="contact" className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold">SchoolERP</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Complete school management solution for the digital age.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                  <li><a href="#roles" className="text-gray-400 hover:text-white transition">Modules</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                  <li><a href="https://lazfort.com/contactus/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Demo</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="https://lazfort.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">About Us</a></li>
                  <li><a href="https://lazfort.com/contactus/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Careers</a></li>
                  <li><a href="https://lazfort.com/blog/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="https://lazfort.com/contactus/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    schoolerp@lazfort.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 SchoolERP. All rights reserved. Created by Lazfort Tech.
              </p>

            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Landing
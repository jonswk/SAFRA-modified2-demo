import React, { useState } from 'react';
import { CreditCard, Calendar, Award, Compass, Check, BookOpen, MapPin, CheckCircle, Ticket, Plus, Users, QrCode } from 'lucide-react';

interface MemberPortalProps {
  email: string;
  name: string;
  onLogout: () => void;
}

interface Booking {
  id: string;
  facility: string;
  clubhouse: string;
  date: string;
  timeSlot: string;
}

export default function MemberPortal({ email, name, onLogout }: MemberPortalProps) {
  // Mock State
  const [points, setPoints] = useState(1450);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK-8902',
      facility: 'Futsal Court 1',
      clubhouse: 'SAFRA Jurong',
      date: '2026-07-22',
      timeSlot: '19:00 - 21:00'
    }
  ]);
  const [interestGroups, setInterestGroups] = useState<string[]>(['SAFRA Running Club']);
  const [redeemedVouchers, setRedeemedVouchers] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Booking fields
  const [bookFacility, setBookFacility] = useState('Swimming Pool Lane');
  const [bookClub, setBookClub] = useState('SAFRA Punggol');
  const [bookDate, setBookDate] = useState('2026-07-25');
  const [bookTime, setBookTime] = useState('14:00 - 16:00');

  // Available Data
  const availableGroups = [
    { name: 'SAFRA Running Club', desc: 'Weekly running sessions across scenic national parks.' },
    { name: 'Tactical Shooting Club', desc: 'Focus on precision target systems and competitive sport shooting.' },
    { name: 'SAFRA Photographic Club', desc: 'Masterclass workshops, photowalks, and gear reviews.' },
    { name: 'Golf Section', desc: 'Special green fee access rates at premium regional golf resorts.' }
  ];

  const availableVouchers = [
    { id: 'V-AST', name: '$5 Astons Specialities Diner', desc: 'No minimum spend required. Valid at all outlets.' },
    { id: 'V-BOWL', name: 'Free Game at Orchid Bowl', desc: 'Valid at SAFRA Punggol and SAFRA Yishun.' },
    { id: 'V-GYM', name: 'Elite Gym Day Pass', desc: 'Free single entry pass to any EnergyOne gym.' }
  ];

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const handleBookFacilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      facility: bookFacility,
      clubhouse: bookClub,
      date: bookDate,
      timeSlot: bookTime
    };

    setBookings([newBooking, ...bookings]);
    triggerSuccess(`Successfully booked ${bookFacility} at ${bookClub}!`);
  };

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    triggerSuccess('Booking has been cancelled successfully.');
  };

  const toggleGroup = (groupName: string) => {
    if (interestGroups.includes(groupName)) {
      setInterestGroups(interestGroups.filter(g => g !== groupName));
      triggerSuccess(`Left ${groupName}.`);
    } else {
      setInterestGroups([...interestGroups, groupName]);
      triggerSuccess(`Successfully joined ${groupName}!`);
    }
  };

  const handleRedeemVoucher = (id: string, name: string) => {
    if (redeemedVouchers.includes(id)) return;
    setRedeemedVouchers([...redeemedVouchers, id]);
    setPoints(prev => Math.max(0, prev - 100)); // Cost of redemption
    triggerSuccess(`Successfully claimed voucher: ${name}!`);
  };

  return (
    <div className="bg-gray-100 flex-1 py-8 px-4 text-left" id="portal-root">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-sm shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-safra-red">
          <div>
            <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
              Good Evening, <span className="text-safra-red capitalize">{name || 'Jonathan'}</span>!
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Active Member Profile • Last sign-in: Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="text-right bg-gray-50 px-4 py-2 rounded border border-gray-100">
              <span className="text-[10px] text-gray-400 block uppercase font-bold">SAFRAPoints Balance</span>
              <span className="text-lg font-black text-safra-red">{points.toLocaleString()} PTS</span>
            </div>
          </div>
        </div>

        {/* Global Toast Success Notification */}
        {successMsg && (
          <div className="bg-emerald-600 text-white p-3.5 rounded-sm shadow-md flex items-center gap-2 text-xs font-bold animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Content Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE COLUMN: MEMBERSHIP CARD & INTEREST GROUPS (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Visual Virtual Membership Card */}
            <div className="bg-slate-900 rounded-lg p-6 text-white relative overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between min-h-[260px]">
              {/* Design accents */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-safra-red/40 via-transparent to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-800 rounded-full blur-xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-lg tracking-tight uppercase text-white">mySAFRA</h3>
                  <span className="text-[9px] uppercase font-bold bg-safra-red px-2 py-0.5 tracking-wider rounded-sm text-white">
                    Premium NSman
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">National Service</span>
                  <span className="text-xs font-bold text-slate-300">ASSOCIATION</span>
                </div>
              </div>

              {/* Card Mid: User info */}
              <div className="space-y-1 my-6 z-10">
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 block">CARDMEMBER NAME</span>
                <span className="text-base font-extrabold capitalize text-white block tracking-wide">{name || 'Jonathan'}</span>
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 block">MEMBER ID</span>
                    <span className="font-mono text-sm font-semibold tracking-wider text-slate-200">S8123456D</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 block">EXPIRES</span>
                    <span className="text-xs font-semibold text-slate-200">12/2029</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Barcode simulation */}
              <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-8 h-8 text-white bg-white p-1 rounded" />
                  <span className="text-[9px] text-slate-400 font-mono">Scan at clubhouse gate</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  Active Card
                </span>
              </div>
            </div>

            {/* Interest Groups Module */}
            <div className="bg-white rounded-sm shadow-sm p-6 text-left">
              <h3 className="text-sm font-black text-gray-800 uppercase border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-safra-red" />
                <span>My Interest Groups</span>
              </h3>
              
              <div className="space-y-4">
                {availableGroups.map((group) => {
                  const isJoined = interestGroups.includes(group.name);
                  return (
                    <div key={group.name} className="p-3 border rounded-sm hover:bg-gray-50 transition-colors flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-800">{group.name}</h4>
                        <p className="text-gray-500 text-[11px] leading-relaxed">{group.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleGroup(group.name)}
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-sm border cursor-pointer ${
                          isJoined 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                            : 'bg-white text-safra-red border-safra-red hover:bg-red-50'
                        }`}
                        id={`group-toggle-${group.name.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {isJoined ? 'Joined' : 'Join'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE COLUMN: FACILITY BOOKINGS & VOUCHERS (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Book Clubhouse Facilities */}
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h3 className="text-sm font-black text-gray-800 uppercase border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-safra-red" />
                <span>Book Clubhouse Facility</span>
              </h3>

              <form onSubmit={handleBookFacilitySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Facility */}
                <div>
                  <label className="input-label block">Select Facility</label>
                  <select
                    value={bookFacility}
                    onChange={(e) => setBookFacility(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-safra-red"
                    id="book-select-facility"
                  >
                    <option value="Swimming Pool Lane">Swimming Pool Lane</option>
                    <option value="Futsal Court 1">Futsal Court 1</option>
                    <option value="Tennis Court A">Tennis Court A</option>
                    <option value="EnergyOne Gym Slot">EnergyOne Gym Slot (PowerHour)</option>
                  </select>
                </div>

                {/* Clubhouse */}
                <div>
                  <label className="input-label block">Select Clubhouse Location</label>
                  <select
                    value={bookClub}
                    onChange={(e) => setBookClub(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-safra-red"
                    id="book-select-clubhouse"
                  >
                    <option value="SAFRA Punggol">SAFRA Punggol</option>
                    <option value="SAFRA Jurong">SAFRA Jurong</option>
                    <option value="SAFRA Toa Payoh">SAFRA Toa Payoh</option>
                    <option value="SAFRA Mt Faber">SAFRA Mt Faber</option>
                    <option value="SAFRA Tampines">SAFRA Tampines</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="input-label block">Date</label>
                  <input
                    type="date"
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-safra-red"
                    id="book-date"
                  />
                </div>

                {/* Time slot */}
                <div>
                  <label className="input-label block">Time Slot</label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-safra-red"
                    id="book-time"
                  >
                    <option value="09:00 - 11:00">Morning Session: 09:00 - 11:00</option>
                    <option value="14:00 - 16:00">Afternoon Session: 14:00 - 16:00</option>
                    <option value="19:00 - 21:00">Evening Premium: 19:00 - 21:00</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="sm:col-span-2 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-safra-red hover:bg-safra-red-dark text-white px-6 py-2.5 rounded-sm font-bold uppercase transition-colors tracking-wide cursor-pointer text-[11px]"
                    id="facility-book-btn"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>

            {/* My Active Bookings List */}
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h3 className="text-sm font-black text-gray-800 uppercase border-b border-gray-100 pb-3 mb-4">
                My Active Bookings
              </h3>

              {bookings.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-xs">
                  No active facility bookings currently scheduled. Choose a facility above to schedule.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800 text-sm">{booking.facility}</span>
                          <span className="bg-slate-100 text-slate-600 font-mono text-[10px] px-1.5 py-0.5 rounded">
                            {booking.id}
                          </span>
                        </div>
                        <div className="text-gray-500 flex flex-wrap gap-x-4">
                          <span className="flex items-center gap-1">
                            📍 {booking.clubhouse}
                          </span>
                          <span>
                            📅 {booking.date}
                          </span>
                          <span>
                            ⏰ {booking.timeSlot}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-[10px] text-gray-400 hover:text-safra-red font-bold uppercase tracking-wider self-start sm:self-center cursor-pointer"
                        id={`cancel-btn-${booking.id.toLowerCase()}`}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SAFRA Members Dining / Leisure Vouchers */}
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h3 className="text-sm font-black text-gray-800 uppercase border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-safra-red" />
                <span>Claim Member Benefits & Vouchers</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {availableVouchers.map((voucher) => {
                  const isClaimed = redeemedVouchers.includes(voucher.id);
                  return (
                    <div key={voucher.id} className="p-4 border border-dashed border-gray-200 rounded bg-gray-50 flex flex-col justify-between text-left space-y-3">
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono block">BENEFIT</span>
                        <h4 className="font-extrabold text-gray-800 mt-0.5">{voucher.name}</h4>
                        <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{voucher.desc}</p>
                      </div>

                      <button
                        disabled={isClaimed}
                        onClick={() => handleRedeemVoucher(voucher.id, voucher.name)}
                        className={`w-full py-1.5 text-[10px] font-bold uppercase rounded-sm border transition-all cursor-pointer ${
                          isClaimed
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-safra-red border-safra-red hover:bg-safra-red hover:text-white'
                        }`}
                        id={`voucher-btn-${voucher.id.toLowerCase()}`}
                      >
                        {isClaimed ? 'Redeemed' : 'Claim (100 pts)'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

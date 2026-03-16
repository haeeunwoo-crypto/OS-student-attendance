import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Calendar as CalendarIcon, BarChart3, 
  Settings, MessageSquare, Bell, ChevronDown, CheckCircle2,
  AlertCircle, AlertTriangle, UserPlus, UploadCloud, Search,
  Filter, MessageCircle, FileText, ChevronRight, MonitorPlay, 
  ShieldAlert, GraduationCap, CheckSquare, ShieldCheck, 
  Activity, Briefcase, Sliders, Database, Zap,
  TrendingUp, TrendingDown, Clock, UserCheck, DollarSign, Star,
  Link as LinkIcon, Plus, Trash2, DownloadCloud, PlayCircle, Video,
  ChevronLeft, FileSpreadsheet, PhoneCall, Shield, UserCog,
  Target, Edit3, Check, X, FileUp, Award, Layers, Hash, Copy, Inbox, Send
} from 'lucide-react';

// --- MOCK DATA ---
const currentPrograms = ["KDT 서비스 기획 5기", "KDT 프론트엔드 10기", "KDT 데이터 분석 24기"];

// 총 훈련일(180일) 누적 데이터
const mockStudents = [
  { id: 1, name: "김커널", email: "kernel.k@email.com", program: "KDT 데이터 분석 24기", status: "안전", progress: 92, currentScore: 88, 
    totalDays: 180, presentCount: 175, absenceCount: 0, lateCount: 2, 
    dropoutWarning: false, earlyCompletion: false },
  { id: 2, name: "이배포", email: "deploy.l@email.com", program: "KDT 데이터 분석 24기", status: "주의", progress: 78, currentScore: 72, 
    totalDays: 180, presentCount: 155, absenceCount: 15, lateCount: 10, 
    dropoutWarning: false, earlyCompletion: false },
  { id: 3, name: "박서버", email: "server.p@email.com", program: "KDT 데이터 분석 24기", status: "위험", progress: 45, currentScore: 50, 
    totalDays: 180, presentCount: 130, absenceCount: 38, lateCount: 12, 
    dropoutWarning: true, earlyCompletion: false },
  { id: 4, name: "최데이터", email: "data.c@email.com", program: "KDT 데이터 분석 24기", status: "안전", progress: 98, currentScore: 95, 
    totalDays: 180, presentCount: 180, absenceCount: 0, lateCount: 0, 
    dropoutWarning: false, earlyCompletion: true },
  { id: 5, name: "정클라우드", email: "cloud.j@email.com", program: "KDT 데이터 분석 24기", status: "주의", progress: 65, currentScore: 60, 
    totalDays: 180, presentCount: 145, absenceCount: 25, lateCount: 10, 
    dropoutWarning: false, earlyCompletion: false },
];

// --- HELPER COMPONENTS ---
const Badge = ({ children, type = "default", className = "" }) => {
  const types = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    primary: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide flex items-center gap-1 w-max ${types[type] || types.default} ${className}`}>
      {children}
    </span>
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const [activeMenu, setActiveMenu] = useState('op_attendance');
  const [selectedProgram, setSelectedProgram] = useState(currentPrograms[2]);

  const menuSections = [
    {
      title: "ADMINISTRATION",
      description: "프로그램 기획 및 데이터 관리",
      menus: [
        { id: 'admin_dashboard', label: '관리자 대시보드', icon: LayoutDashboard },
        { id: 'admin_setup', label: '프로그램 셋업', icon: Settings },
      ]
    },
    {
      title: "OPERATION",
      description: "실시간 수강생 및 학습 운영",
      menus: [
        { id: 'op_dashboard', label: '운영자 대시보드', icon: Activity },
        { id: 'op_students', label: '수강생 관리 (CRM)', icon: Users },
        { id: 'op_attendance', label: '출결 & 학습 관리', icon: CheckSquare },
        { id: 'op_qna', label: '운영 상담 & 공지', icon: MessageSquare },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
        <div className="p-6 flex items-center justify-center border-b border-gray-100 h-16 box-border">
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 bg-[#FF2D55] text-white rounded-bl-xl rounded-tr-xl flex items-center justify-center font-bold text-lg italic" style={{ clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }}>K</div>
             <span className="font-bold text-xl tracking-tight text-[#111827]">Kernel<span className="font-normal text-gray-500 ml-1">Academy</span></span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-5 mb-2">
                <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">{section.title}</h3>
                <p className="text-[10px] text-gray-400">{section.description}</p>
              </div>
              <ul className="space-y-0.5 px-3">
                {section.menus.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = activeMenu === menu.id;
                  return (
                    <li key={menu.id}>
                      <button
                        onClick={() => setActiveMenu(menu.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                        {menu.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select 
                className="appearance-none bg-white border border-gray-200 hover:border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 block w-64 p-2 pr-8 font-semibold shadow-sm transition-all cursor-pointer"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                {currentPrograms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-indigo-500 pointer-events-none" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-green-700 tracking-wider">LMS SYNCED</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-[#F8FAFC]">
          {activeMenu === 'op_attendance' && <OperatorAttendanceMgmt />}
          {activeMenu !== 'op_attendance' && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Database size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">개발 예정 메뉴</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">해당 기능은 <strong>OS 플랫폼 Phase 2</strong> 업데이트 시 반영될 예정입니다.<br/></p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// OPERATION COMPONENTS: ATTENDANCE MANAGEMENT (종합 현황 고도화 v1.6)
// ============================================================================

function OperatorAttendanceMgmt() {
  const [activeSubTab, setActiveSubTab] = useState('종합 현황 (장려금/제적)');
  const [detailedStudent, setDetailedStudent] = useState(null); 
  const [currentDetailMonth, setCurrentDetailMonth] = useState(1); // 출석부 모달 월별 페이지네이션 (1~6회차)
  
  const [nudgeModalStudent, setNudgeModalStudent] = useState(null); // 알람/넛지 모달
  const [selectedTemplate, setSelectedTemplate] = useState("출석 독려");
  const [nudgeMessage, setNudgeMessage] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  const nudgeTemplates = {
    "출석 독려": "[출석 독려 안내]\n\n안녕하세요 {name} 수강생님, 운영 매니저입니다.\n최근 출결 상황이 지연되고 있어 독려차 안내드립니다.\n출석률 80% 미만 시 훈련 장려금 수급이 어려울 수 있으니 남은 기간 힘내주시기 바랍니다!",
    "제적 경고": "⚠️ [제적 위험 안내]\n\n안녕하세요 {name} 수강생님.\n현재 누적 결석일이 제적 기준에 임박하였습니다.\n추가 결석 발생 시 고용노동부 지침에 따라 강제 제적 처리될 수 있으니, 즉시 매니저에게 연락 및 상담을 진행해 주시기 바랍니다.",
    "지각 주의": "[지각 누적 안내]\n\n안녕하세요 {name} 수강생님.\n지각/조퇴/외출이 3회 누적되면 1일 결석으로 처리됩니다.\n원활한 수료를 위해 정시 입실을 권장해 드립니다."
  };

  useEffect(() => {
    if (nudgeModalStudent) {
      setNudgeMessage(nudgeTemplates[selectedTemplate].replace("{name}", nudgeModalStudent.name));
    }
  }, [selectedTemplate, nudgeModalStudent]);

  // 페이지네이션 처리
  const handlePrevMonth = () => setCurrentDetailMonth(prev => Math.max(1, prev - 1));
  const handleNextMonth = () => setCurrentDetailMonth(prev => Math.min(6, prev + 1));

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSendNudge = () => {
    showToast(`💬 [${nudgeModalStudent.name}] 수강생에게 카카오톡 알림톡이 전송되었습니다.`);
    setNudgeModalStudent(null);
  };

  // 학생별 일자별 출결 데이터 생성기 (월별/회차별)
  const generateDailyLogs = (student, monthIndex) => {
    const logs = [];
    // 가상의 시작 날짜 (2023년 10월 2일)
    const startDate = new Date('2023-10-02');
    
    // 월별 오프셋 계산 (한 달을 20일 훈련일로 가정)
    const daysOffset = (monthIndex - 1) * 20 * 1.4; // 주말 포함 대략적인 일수 오프셋
    startDate.setDate(startDate.getDate() + daysOffset);
    
    // 단순 시각화를 위해 랜덤 배치 (실제로는 API 연동)
    for (let i = 0; i < 20; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i + Math.floor(i / 5) * 2); 
      
      const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][currentDate.getDay()];
      const dateStr = `${currentDate.getMonth() + 1}/${currentDate.getDate().toString().padStart(2, '0')}`;
      
      let status = '출석';
      let type = 'success';

      // 위험 학생일수록 결석/지각을 많이 표시
      const randomBase = student.absenceCount > 20 ? 0.6 : 0.85; 
      
      if (Math.random() > randomBase) {
        status = '결석'; type = 'danger';
      } else if (Math.random() > randomBase + 0.1) {
        status = '지각'; type = 'warning';
      }

      logs.push({ day: (monthIndex - 1) * 20 + i + 1, dateStr, dayOfWeek, status, type });
    }
    return logs;
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out] relative">
      
      {/* ---------------- Toast Notification ---------------- */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-[#FEE500] text-[#000000] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-[60] animate-[slideUp_0.4s_ease-out] border border-yellow-400">
          <MessageCircle size={20} className="fill-black"/>
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* ---------------- 알람/넛지 발송 모달 ---------------- */}
      {nudgeModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm" onClick={() => setNudgeModalStudent(null)}>
          <div className="bg-white rounded-2xl w-[500px] shadow-2xl flex flex-col animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-gray-100 bg-yellow-50/50 rounded-t-2xl flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <MessageCircle size={20} className="text-yellow-600"/> 알람/넛지 발송 (카카오톡)
              </h3>
              <button onClick={() => setNudgeModalStudent(null)} className="text-gray-400 hover:text-gray-700">
                <X size={20}/>
              </button>
            </div>
            
            <div className="p-6 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">수신자</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-800">
                  {nudgeModalStudent.name} 수강생 ({nudgeModalStudent.program})
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">넛지 템플릿 선택</label>
                <select 
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 outline-none font-medium cursor-pointer"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="출석 독려">출석 독려 (장려금 안내)</option>
                  <option value="제적 경고">제적 경고 (강력 경고)</option>
                  <option value="지각 주의">지각 누적 주의 안내</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">메시지 내용</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 outline-none resize-none h-40 leading-relaxed"
                  value={nudgeMessage}
                  onChange={(e) => setNudgeMessage(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl flex justify-end gap-2">
              <button onClick={() => setNudgeModalStudent(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100">취소</button>
              <button onClick={handleSendNudge} className="px-5 py-2 bg-[#FEE500] text-[#000000] rounded-lg text-sm font-bold hover:bg-[#FDD800] transition-colors flex items-center gap-2 shadow-sm border border-yellow-400">
                <Send size={16}/> 카카오톡 전송
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 상세 출결 캘린더 모달 ---------------- */}
      {detailedStudent && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm" onClick={() => setDetailedStudent(null)}>
          <div className="bg-white rounded-2xl w-[950px] shadow-2xl flex flex-col animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-lg shadow-sm">
                  {detailedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    {detailedStudent.name} 수강생 <span className="text-gray-300">|</span> <span className="text-indigo-600 text-base">상세 출석부</span>
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mt-0.5">{detailedStudent.program}</p>
                </div>
              </div>
              <button onClick={() => setDetailedStudent(null)} className="text-gray-400 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <X size={20}/>
              </button>
            </div>

            {/* Pagination & Grid Area */}
            <div className="p-6 bg-[#F8FAFC]">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                   <CalendarIcon size={18} className="text-indigo-500"/> 일자별 상세 내역 (20일 단위)
                 </h4>
                 
                 {/* 월별 페이지네이션 (1~6회차) */}
                 <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                   <button 
                     onClick={handlePrevMonth} 
                     disabled={currentDetailMonth === 1}
                     className="p-1 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30 transition-colors"
                   >
                     <ChevronLeft size={18}/>
                   </button>
                   <span className="font-black text-sm text-indigo-700 w-24 text-center">
                     {currentDetailMonth}회차 ({currentDetailMonth + 9 > 12 ? currentDetailMonth - 3 : currentDetailMonth + 9}월)
                   </span>
                   <button 
                     onClick={handleNextMonth}
                     disabled={currentDetailMonth === 6}
                     className="p-1 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30 transition-colors"
                   >
                     <ChevronRight size={18}/>
                   </button>
                 </div>

                 <div className="flex gap-3 text-[11px] font-bold bg-white px-3 py-2 rounded-lg border border-gray-200">
                   <span className="flex items-center gap-1 text-green-600"><span className="w-2 h-2 rounded-full bg-green-500"></span>출석</span>
                   <span className="flex items-center gap-1 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500"></span>결석</span>
                   <span className="flex items-center gap-1 text-yellow-600"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>지/조/외</span>
                 </div>
               </div>
               
               <div className="grid grid-cols-5 gap-3 min-h-[300px]">
                 {generateDailyLogs(detailedStudent, currentDetailMonth).map((log, i) => (
                   <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center justify-center shadow-sm hover:border-indigo-300 transition-colors relative">
                     <span className="absolute top-1.5 left-2 text-[10px] text-gray-300 font-bold">{log.day}일차</span>
                     <div className="text-xs font-bold text-gray-700 mt-2 mb-1.5">{log.dateStr} <span className="text-gray-400 font-medium">({log.dayOfWeek})</span></div>
                     <Badge type={log.type} className="w-full justify-center !text-xs !py-1.5 shadow-inner">{log.status}</Badge>
                   </div>
                 ))}
               </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-white rounded-b-2xl flex justify-between items-center">
              <span className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                <AlertCircle size={14} className="inline mr-1 -mt-0.5"/> 180일 과정은 20일 단위 총 9회차로 구성되며, 이 모달은 시뮬레이션을 위해 6회차까지만 표시합니다.
              </span>
              <button onClick={() => setDetailedStudent(null)} className="px-6 py-2 bg-[#111827] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-gray-800 transition-colors">닫기</button>
            </div>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------------- */}

      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="default">OPERATION</Badge>
            <h1 className="text-2xl font-bold text-gray-900">출결 & 학습 관리</h1>
          </div>
          <p className="text-gray-500 text-sm">수강생의 전체(180일) 누적 출결 및 장려금 수급 현황을 관리하고 넛지를 발송합니다.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          {['정정 요청 관리', '종합 현황 (장려금/제적)', '과제 및 채점'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveSubTab(tab)}
              className={`py-4 text-sm font-bold border-b-2 transition-all relative ${
                activeSubTab === tab ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- FEATURE: Comprehensive Status (180 days & Nudge Action) --- */}
        {activeSubTab === '종합 현황 (장려금/제적)' && (
          <div className="flex flex-col h-full bg-gray-50/30 p-6">
             <div className="mb-4 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-wrap gap-3">
              <div className="flex items-center gap-4 text-sm bg-blue-50/50 px-4 py-2.5 rounded-lg border border-blue-100">
                 <div className="flex items-center gap-2 font-black text-blue-900"><CheckCircle2 size={16}/> 누적 출석 인정 기준</div>
                 <div className="w-px h-4 bg-blue-200"></div>
                 <span className="text-blue-800 font-medium">총 훈련일: <span className="font-bold">180일</span></span>
                 <div className="w-px h-4 bg-blue-200"></div>
                 <span className="text-blue-800 font-medium">지각/조퇴/외출 <span className="font-bold text-red-500">3회</span> = 결석 1일</span>
                 <div className="w-px h-4 bg-blue-200"></div>
                 <span className="text-blue-800 font-medium">전체 장려금 수급: <span className="font-bold">총 출석률 80% 이상</span></span>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
                <FileSpreadsheet size={16} className="text-green-600"/> 엑셀 리포트 다운로드
              </button>
            </div>

            <div className="overflow-x-auto custom-scrollbar bg-white rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[1300px]">
                <thead className="bg-gray-50 text-gray-500 text-[11px] uppercase font-bold border-b border-gray-200 tracking-wider">
                  <tr>
                    <th className="p-4 pl-6">수강생 정보</th>
                    <th className="p-4 text-center border-l border-gray-200 w-24">총 훈련일</th>
                    <th className="p-4 text-center border-l border-gray-200">누적 출석</th>
                    <th className="p-4 text-center">결석</th>
                    <th className="p-4 text-center border-r border-gray-200">지/조/외</th>
                    <th className="p-4 text-center bg-indigo-50/30">전체 출석률</th>
                    <th className="p-4 text-center">장려금 (80%)</th>
                    <th className="p-4 text-center">전체 잔여 결석 허용</th>
                    <th className="p-4 text-center">상태/특이사항</th>
                    <th className="p-4 text-center w-32 border-l border-gray-100">알람/넛지</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockStudents.map(student => {
                    // Total 180 days logic simulation
                    const penaltyDays = Math.floor(student.lateCount / 3);
                    const effectiveAbsence = student.absenceCount + penaltyDays;
                    const calcRate = (((student.totalDays - effectiveAbsence) / student.totalDays) * 100).toFixed(1);
                    const isIncentiveEligible = calcRate >= 80;
                    
                    // 180일 기준 80% 출석하려면 결석이 36일 이하여야 함 (180 * 0.2 = 36)
                    const allowedTotalAbsence = 36;
                    const allowedAbsenceLeft = Math.max(0, allowedTotalAbsence - effectiveAbsence);

                    return (
                      <tr key={student.id} className={`hover:bg-indigo-50/40 transition-colors ${student.dropoutWarning ? 'bg-red-50/10' : ''}`}>
                        <td className="p-4 pl-6 cursor-pointer group" onClick={() => {
                            setCurrentDetailMonth(1); 
                            setDetailedStudent(student);
                          }}>
                          <div className="font-bold text-gray-900 group-hover:text-indigo-600 text-sm">
                            {student.name}
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1 font-medium hover:underline flex items-center gap-1">
                            <CalendarIcon size={10}/> 상세 출석부 보기
                          </div>
                        </td>
                        
                        <td className="p-4 text-center border-l border-gray-100 font-black text-gray-700">{student.totalDays}일</td>
                        
                        <td className="p-4 text-center border-l border-gray-100 font-bold text-green-600 text-lg">{student.presentCount}</td>
                        <td className="p-4 text-center font-bold text-red-500 text-lg">{student.absenceCount}</td>
                        <td className="p-4 text-center border-r border-gray-100 font-bold text-yellow-600 text-lg">{student.lateCount}</td>
                        
                        <td className="p-4 text-center bg-indigo-50/10">
                          <span className={`text-lg font-black ${isIncentiveEligible ? 'text-indigo-700' : 'text-red-600'}`}>{calcRate}%</span>
                        </td>
                        <td className="p-4 text-center">
                          {isIncentiveEligible ? <Badge type="success">대상 (충족)</Badge> : <Badge type="danger">미달 위기</Badge>}
                        </td>
                        <td className="p-4 text-center">
                          {allowedAbsenceLeft > 0 ? (
                            <span className="text-sm font-bold text-gray-700 flex items-center justify-center gap-1">총 {allowedAbsenceLeft}일 가능</span>
                          ) : (
                            <span className="text-sm font-bold text-red-500 flex items-center justify-center gap-1"><X size={14}/>여유 없음 (0일)</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-1.5">
                            {student.dropoutWarning && <Badge type="danger" className="animate-pulse shadow-sm"><AlertTriangle size={12}/> 제적 경고</Badge>}
                            {student.earlyCompletion && <Badge type="primary" className="shadow-sm"><Award size={12}/> 조기 수료</Badge>}
                            {!student.dropoutWarning && !student.earlyCompletion && <span className="text-gray-300 text-xs">-</span>}
                          </div>
                        </td>
                        <td className="p-4 text-center border-l border-gray-100">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setNudgeModalStudent(student); }}
                            className={`px-3 py-1.5 text-[11px] font-bold rounded-lg shadow-sm border transition-colors flex items-center justify-center gap-1.5 w-full
                              ${student.dropoutWarning || !isIncentiveEligible ? 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-[#FEE500] hover:text-black hover:border-yellow-400' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                          >
                            <MessageSquare size={14}/> 넛지 발송
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stub for other tabs */}
        {activeSubTab !== '종합 현황 (장려금/제적)' && (
           <div className="flex-1 flex items-center justify-center flex-col text-gray-400 min-h-[400px]">
             <Inbox size={48} className="mb-4 opacity-50"/>
             <p className="font-medium">{activeSubTab} 기능 영역 (생략됨)</p>
          </div>
        )}
      </div>
    </div>
  );
}

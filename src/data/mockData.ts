export const processSteps = [
  {
    id: 1,
    title: "현장 무료 진단",
    description: "요청 접수 즉시 영업 담당자와 설비 전문가가 현장으로 출동하여 건물의 상태와 취약점을 정확히 진단합니다.",
    icon: "ClipboardCheck"
  },
  {
    id: 2,
    title: "1:1 맞춤형 플랜 제안",
    description: "건물 규모와 노후도, 예산을 고려하여 불필요한 비용을 제외한 최적의 월간 관리 플랜을 제안합니다.",
    icon: "FileSignature"
  },
  {
    id: 3,
    title: "정기 관리 착수",
    description: "계약 체결 후, 분야별 직영 마스터가 배정되어 즉시 관리가 시작됩니다. (주 1~3회 환경관리, 주 1회 시설 점검 등)",
    icon: "Settings"
  },
  {
    id: 4,
    title: "투명한 월간 리포팅",
    description: "청소 전/후 상태, 시설 점검 내역, 민원 처리 결과를 매월 투명하게 문서화하여 소유주/관리단에 보고합니다.",
    icon: "BarChart"
  }
];

export const mockCases = [
  {
    id: "case-1",
    region: "서울 강남구",
    buildingType: "중소형 오피스 빌딩",
    scale: "지하 1층 / 지상 7층",
    mainProblem: "외주 청소업체 불량, 잦은 화장실 배관 막힘, 주차장 비관리에 따른 민원 폭주",
    process: "기존 외주 업체 해지 후 바로바로 직영 청소 마스터 투입. 노후 배관 고압 세척 및 주차단속 시스템 재정비.",
    result: "민원 90% 감소, 신규 임차인 입주 문의 증가, 추가 비용 없이 월 관리비 예산 내 해결 완료."
  },
  {
    id: "case-2",
    region: "경기 판교",
    buildingType: "도시형 생활주택",
    scale: "지하 2층 / 지상 10층 (80세대)",
    mainProblem: "공개 게시판을 통한 주민 간 갈등 심화, 불투명한 관리비 산정, 누수 하자 처리 지연",
    process: "비공개 1:1 민원 접수 폼 도입으로 갈등 차단. 전문 설비팀 투입으로 누수 원인 파악 및 당일 보수. 관리비 내역 상세 공개.",
    result: "주민 만족도 최상, 관리비 투명성 확보표창. 누수에 따른 2차 피해를 초기 진압하여 수백만원 피해 절감."
  },
  {
    id: "case-3",
    region: "서울 서초구",
    buildingType: "고급 빌라",
    scale: "지상 5층 (12세대)",
    mainProblem: "보안 취약 및 야간 시설 관리 부재, 조경 관리 미흡",
    process: "24시간 1588 상황실 연동. 비상시 30분 내 출동 체계 구축. 주 1회 전문 조경사 파견.",
    result: "단지 내 범죄율 0%, 쾌적한 조경 유지로 입주민 주거 가치 상승."
  },
  {
    id: "case-4",
    region: "인천 연수구",
    buildingType: "상업용 상가",
    scale: "지하 3층 / 지상 5층",
    mainProblem: "공용 전기세 과다 청구, 쓰레기 무단 투기로 인한 악취",
    process: "야간 낭비 전력 차단, LED 센서등 전면 교체. 분리수거장 cctv 설치 및 일 2회 집중 청소.",
    result: "공용 전기세 35% 절감. 악취 문제 완전 해결 완료."
  }
];

export const faqData = [
  {
    id: "faq-1",
    question: "관리 견적을 받아보는데 비용이 발생하나요?",
    answer: "아니요, 완전 무료입니다. 접수해주시면 담당자가 현장을 직접 방문하여 진단하고, 거품을 뺀 필요한 서비스만을 모아 견적서를 제안해 드립니다."
  },
  {
    id: "faq-2",
    question: "규모가 작은 빌라나 꼬마빌딩도 관리가 가능한가요?",
    answer: "물론입니다. 바로바로건물관리는 대형 빌딩뿐만 아니라 소규모 빌라, 원룸 건물, 꼬마빌딩에 특화된 맞춤형 컴팩트 요금제를 제공하고 있습니다."
  },
  {
    id: "faq-3",
    question: "새벽에 배관이 터지는 등 응급 상황 발생 시 바로 조치가 되나요?",
    answer: "네, 당사 24시간 상황실로 연락 주시면, 해당 권역의 대기 중인 직영 기사가 야간/새벽 관계없이 즉각 출동하여 1차 응급 조치를 진행합니다."
  },
  {
    id: "faq-4",
    question: "청소 관리 인력은 어떻게 배정되나요?",
    answer: "하청을 주지 않고 본사에서 직접 교육하고 관리하는 '직영 마스터'가 고정적으로 배정됩니다. 인력이 자주 바뀌지 않아 건물의 히스토리를 정확히 파악하고 관리합니다."
  }
];

export const servicesPreview = [
  {
    id: "srv-1",
    title: "정기관리",
    desc: "주/월 단위 스케줄에 따른 확실한 방문 관리",
    icon: "CalendarCheck"
  },
  {
    id: "srv-2",
    title: "청소·환경관리",
    desc: "보건 기준의 딥클리닝 및 분리수거장 케어",
    icon: "Sparkles"
  },
  {
    id: "srv-3",
    title: "시설점검",
    desc: "전기, 소방, 승강기 등 법정 점검 대행",
    icon: "ShieldCheck"
  },
  {
    id: "srv-4",
    title: "하자·보수 대응",
    desc: "문제 발생 시 지체 없는 전문가 출동 보수",
    icon: "Wrench"
  },
  {
    id: "srv-5",
    title: "관리비·행정",
    desc: "투명하고 정확한 부과, 연체금 관리",
    icon: "Calculator"
  },
  {
    id: "srv-6",
    title: "민원·주차",
    desc: "입주민 불만 1:1 케어 및 주차 질서 확립",
    icon: "UserCheck"
  }
];

// 구조화 데이터(JSON-LD) 컴포넌트
// -----------------------------------------------
// 실제 회사 정보로 교체가 필요한 항목에 TODO 주석을 표시했습니다.

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "바로건물관리",
    "alternateName": "Baro Building Management",
    "description": "접수는 빠르게, 대응은 정확하게, 관리는 투명하게. 공동주택·빌라·소형빌딩 종합건물관리 전문 파트너.",
    "url": "https://barobm.co.kr",
    "telephone": "1588-0000", // TODO: 실제 전화번호로 교체
    "email": "help@barobaro.com", // TODO: 실제 이메일로 교체
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "테헤란로 123", // TODO: 실제 주소로 교체
      "addressLocality": "강남구", // TODO: 실제 구/동으로 교체
      "addressRegion": "서울특별시", // TODO: 실제 시/도로 교체
      "postalCode": "06234", // TODO: 실제 우편번호로 교체
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.5045", // TODO: 실제 위도로 교체
      "longitude": "127.0490" // TODO: 실제 경도로 교체
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "대한민국 전역"
    },
    "serviceType": [
      "환경미화",
      "시설유지보수",
      "민원·하자처리",
      "회계관리",
      "공동주택관리",
      "빌라관리"
    ],
    "sameAs": [
      "https://barobm.co.kr"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "관리 계약 최소 기간이 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "기본 계약 기간은 1년이며, 3개월 전 해지 통보 시 중도 해지가 가능합니다."
        }
      },
      {
        "@type": "Question",
        "name": "소규모 빌라나 단독주택도 관리가 가능한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 가능합니다. 대규모 아파트 단지부터 10세대 미만의 소규모 빌라까지 다양한 규모의 건물을 관리합니다."
        }
      },
      {
        "@type": "Question",
        "name": "야간이나 주말에 긴급 상황이 발생하면 어떻게 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "바로건물관리는 24시간 365일 운영되는 CS 상황실을 운영합니다. 긴급 누수, 정전 등 긴급 상황 발생 시 즉시 대응 인력을 파견합니다."
        }
      },
      {
        "@type": "Question",
        "name": "관리비는 어떻게 책정되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "건물 규모, 세대수, 요청 서비스 항목에 따라 맞춤 산정됩니다. 무료 방문 컨설팅을 통해 정확한 견적을 받아보세요."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

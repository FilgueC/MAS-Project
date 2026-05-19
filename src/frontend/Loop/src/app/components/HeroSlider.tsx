import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

const slides = [
  {
    title: "Tecnologia que merece uma segunda vida",
    subtitle: "Produtos eletrónicos recondicionados com garantia de qualidade",
    image: "https://st4.depositphotos.com/1017228/21326/i/450/depositphotos_213262698-stock-photo-close-excited-young-girl-standing.jpg",
    cta: "Explorar Produtos",
    link: "/produtos",
    bgColor: "from-emerald-900/80 to-emerald-700/80",
  },
  {
    title: "Computadores Premium Recondicionados",
    subtitle: "Performance profissional a preços acessíveis",
    image: "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzMyMzI3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "Ver Computadores",
    link: "/produtos?categoria=Computador",
    bgColor: "from-gray-900/80 to-gray-700/80",
  },
  {
    title: "Sustentabilidade em Cada Escolha",
    subtitle: "Reduza o impacto ambiental sem comprometer a qualidade",
    image: "https://images.unsplash.com/photo-1719256969258-2be8c184e3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHRlY2hub2xvZ3klMjBncmVlbnxlbnwxfHx8fDE3NzMyNTg1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "Saiba Mais",
    link: "/sobre",
    bgColor: "from-emerald-800/80 to-teal-700/80",
  },
  {
    title: "Áudio de Alta Qualidade",
    subtitle: "Auscultadores e colunas recondicionados das melhores marcas",
    image: "https://images.unsplash.com/photo-1640300065113-738f2abb8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBhdWRpb3xlbnwxfHx8fDE3NzMyNTIwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "Ver Áudio",
    link: "/produtos?categoria=Auscultadores",
    bgColor: "from-slate-900/80 to-slate-700/80",
  },
];

export function HeroSlider() {
  const navigate = useNavigate();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative mt-20">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`} />

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-3xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-100">
                    {slide.subtitle}
                  </p>
                  <button 
                    onClick={() => navigate(slide.link)}
                    className="bg-white text-emerald-700 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors text-lg"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
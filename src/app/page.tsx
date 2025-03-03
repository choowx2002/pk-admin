import CardsPage from "../components/CardListPage";

export default function Home() {
  return (
    <div className="bg-amber-50 min-h-lvh overflow-x-scroll ">
      {/* <h1 className="text-3xl font-bold">欢迎来到卡牌管理系统</h1> */}
      <CardsPage />
    </div>
  );
}

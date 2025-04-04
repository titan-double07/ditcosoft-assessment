import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Banknote, ChevronDown, Search } from "lucide-react";
import { AppSidebar } from "../../components/app-sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { Barchart } from "../base/BarChart";

export default function Dashboard() {
  return (
    <SidebarProvider>
      {/* dashboard sidebar */}
      <AppSidebar />
      <SidebarInset>
        {/* dashboard header */}
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex justify-between items-center w-full">
            <p>Home</p>
            <div className="flex items-center gap-2 ">
              <div className="border flex items-center px-2 rounded-lg w-full max-w-[200px]">
                <Input className="border-0 shadow-none focus-visible:ring-0, " />
                <Search size={18} />
              </div>
              {/* profile trigger */}
              <ProfileModal>
                <div className="flex items-center gap-1 cursor-pointer">
                  <div className="overflow-hidden rounded-full size-10">
                    <Avatar>
                      <AvatarFallback className="font-semibold border border-black">
                        CO
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h2 className="hidden sm:block text-sm">Chisom</h2>
                  <ChevronDown className="text-dark-one/40" />
                </div>
              </ProfileModal>
            </div>
          </div>
        </header>
        {/* dashboard content */}
        <Content />
      </SidebarInset>
    </SidebarProvider>
  );
}

const ProfileModal = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        className={cn(
          " rounded-md space-y-1 overflow-hidden shadow-md bg-white "
        )}>
        {/* profile*/}
        <div className="py-3 ">
          <p className="font-semibold text-base">{`Chisom Okereke`}</p>
          <p className="text-sm text-[#6d7d93]">{`chisomwebdev@outlook.com`}</p>
        </div>

        {/* logout button */}
        <Button
          onClick={() => {
            navigate("/");
          }}
          className="w-full h-[40px] bg-inherit hover:bg-red-800/40 hover:text-white text-red-800">
          Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const Content = () => {
  return (
    <div className="p-10 space-y-2">
      {/* welcome message */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Welcome back, Chisom</h1>
        <p className=" max-w-[800px]">
          Track your sales and performance at a glance with our dynamic
          dashboard, providing real-time insight on revenue, conversions, and
          customer acquisition.
        </p>
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center pt-10 gap-5 ">
          {/* card */}
          <div className="rounded-xl flex items-center justify-center border h-[100px] gap-5 w-[250px] ">
            {/* icon */}
            <div className="rounded-full  bg-gray-100 p-2">
              <Banknote size={"30px"} color="#37c848" />
            </div>
            {/* metric */}
            <div>
              <p className="font-bold text-xl">$6,000,000</p>
              <p className="text-sm">Total revenue</p>
            </div>
          </div>
          {/* card */}
          <div className="rounded-xl flex items-center justify-center border h-[100px] gap-5 w-[250px] ">
            {/* icon */}
            <div className="rounded-full  bg-gray-100 p-2">
              <Banknote size={"30px"} color="#37c848" />
            </div>
            {/* metric */}
            <div>
              <p className="font-bold text-xl">$6,000,000</p>
              <p className="text-sm">Total revenue</p>
            </div>
          </div>
          {/* card */}
          <div className="rounded-xl flex items-center justify-center border h-[100px] gap-5 w-[250px] ">
            {/* icon */}
            <div className="rounded-full  bg-gray-100 p-2">
              <Banknote size={"30px"} color="#37c848" />
            </div>
            {/* metric */}
            <div>
              <p className="font-bold text-xl">$6,000,000</p>
              <p className="text-sm">Total revenue</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Barchart />
        </div>
      </div>
    </div>
  );
};

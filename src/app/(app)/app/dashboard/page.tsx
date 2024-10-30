import Branding from "@/components/Branding"
import ContentBlock from "@/components/ContentBlock"
import PetButton from "@/components/PetButton"
import PetDetail from "@/components/PetDetail"
import PetList from "@/components/PetList"
import SearchForm from "@/components/SearchForm"
import Stats from "@/components/Stats"
import {PlusIcon} from "@radix-ui/react-icons"

export default function Page() {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <Branding />

        <Stats />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] gap-4 md:h-[600px] grid-rows-[45px_300px_500px]">
        <div className="md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-1">
          <SearchForm />
        </div>

        <div className="md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-full relative">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-3 right-3">
              <PetButton actionType="add">
                <PlusIcon className="h-6 w-6" />
              </PetButton>
            </div>
          </ContentBlock>
        </div>

        <div className="md:col-start-2 md:col-span-full md:row-start-1 md:row-span-full">
          <ContentBlock>
            <PetDetail />
          </ContentBlock>
        </div>
      </div>
    </main>
  )
}

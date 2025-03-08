import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import usePeopleData from '../../hooks/useData';
import { Card, Input, Loading, Pagination } from '../../components';
import { renderPersonInfo } from '../../constants/renderPersonInfo';
import { Result } from '../../hooks/types';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/modal';
import useAllData from '../../hooks/useAllData';

const People: React.FC = () => {
  const location = useLocation();
  const { register, handleSubmit } = useForm<{ search: string }>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: { search: string }) => {
    setSearchTerm(data.search);
  };

  const { query, loading } = usePeopleData(location.pathname, searchTerm);
  const { AllData, loadingAllData } = useAllData(selectedId as string);
  const handleCardClick = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  return (
    <div className="bg-blue-950 min-h-screen p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
            <div className="w-full flex flex-col items-center">
              <h2 className="text-white text-xl font-bold text-center md:text-start">
                Search by films
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="gap-2 w-full">
                <Input label="" placeholder='Search' {...register("search")} rightIcon={<Search />} />
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {query?.results.map((item: Result) => {
                const id = item.url.split("/").filter(Boolean).pop();
                return (
                <div className="cursor-pointer" onClick={() => handleCardClick(id as string)}>
                  <Card key={item.name} title={item.name}>
                    {renderPersonInfo("Height", item.height)}
                    {renderPersonInfo("Mass", item.mass)}
                    {renderPersonInfo("birth", item.birth_year)}
                    {renderPersonInfo("Gender", item.gender)}
                  </Card>
                </div>
              );
            })}
            </div>
        </>
      )}
      {(query?.next || query?.previous) && (
        <Pagination hasNext={!!query?.next} hasPrevious={!!query?.previous} />
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {loadingAllData ? (
            <div className="flex justify-center h-96 items-center ">
              <Loading />
            </div>
          ) : (
            <>
              <h3 className="text-red-800 text-xl font-bold">Peoples</h3>
              {AllData && AllData.character && (
                <>
                  <div>
                    {renderPersonInfo("Name", AllData.character.name)}
                    {renderPersonInfo("Height", AllData.character.height)}
                    {renderPersonInfo("Mass", AllData.character.mass)}
                    {renderPersonInfo("Birth Year", AllData.character.birth_year)}
                    {renderPersonInfo("Gender", AllData.character.gender)}
                    {renderPersonInfo("Hair Color", AllData.character.hair_color)}
                    {renderPersonInfo("Skin Color", AllData.character.skin_color)}
                    {renderPersonInfo("Eye Color", AllData.character.eye_color)}
                  </div>
                  <div>
                    <h3 className="text-red-800 text-xl font-bold mt-4">Films</h3>
                    {AllData.films.map((film: { title: string; }, index: number) => (
                      <div key={index} className='gap-4'>
                        <h6 className="text-black font-semibold text-sm">{film.title}</h6>
                      </div>
                    ))}
                  </div>
                  <div>
                    {AllData.species.map((specie: { name: string; language: string; classification: string; designation: string; }, index: number) => (
                      <div key={index}>
                        <h3 className="text-red-800 text-xl font-bold mt-4">Specie</h3>
                        {renderPersonInfo("Specie", specie.name)}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default People;

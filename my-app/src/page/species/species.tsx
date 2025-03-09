import React, { useState } from 'react';
import { Card, Input, Loading, NotFound, Pagination } from '../../components';
import usePeopleData from '../../hooks/useData';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { renderPersonInfo } from '../../constants/renderPersonInfo';
import { SpeciesData } from '../../hooks/types';
import { useLocation } from 'react-router-dom';

const Species: React.FC = () => {
  const location = useLocation();
    const { register, handleSubmit } = useForm<{ search: string }>();
    const [searchTerm, setSearchTerm] = useState("");
  
    const onSubmit = (data: { search: string }) => {
      setSearchTerm(data.search);
    };
  
  const { query, loading } = usePeopleData(location.pathname, searchTerm);

    return (
      <div className="bg-blue-950 min-h-screen p-4">
          <div className="w-full flex flex-col items-center">
          <h2 className="text-white text-xl font-bold text-center md:text-start">
            Search by species
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="gap-2 w-full">
            <Input label="" placeholder='Search' {...register("search")} rightIcon={<Search />} />
            </form>
          </div>
  
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Loading />
            </div>
          ) : (
            <>
              {query?.results?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {query?.results.map((item: SpeciesData) => {
                  
                  return (
                    <Card key={item.name} title={item.name}>
                      <div className="h-full w-full">
                        {renderPersonInfo("language", item.language)}
                        {renderPersonInfo("Eye colors", item.eye_colors)}
                        {renderPersonInfo("Hair colors", item.hair_colors)}
                        {renderPersonInfo("Designation", item.designation)}
                      </div>
                    </Card>
                  );
                })}
              </div>
              ) : (
                <NotFound />
              )}
              {(query?.next || query?.previous) && (
                <Pagination hasNext={!!query?.next} hasPrevious={!!query?.previous} />
              )}
            </>
        )}
      </div> 
    );
  };

export default Species;
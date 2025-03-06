import React, { useState } from 'react';
import usePeopleData from '../../hooks/usePeopleList';
import {  Card, Input, Loading, Pagination } from '../../components';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
    const { register, handleSubmit } = useForm<{ search: string }>();
    const [searchTerm, setSearchTerm] = useState("");

    const onSubmit = (data: { search: string }) => {
        setSearchTerm(data.search);
        // setPage(1); 
    };

    const { peopleQuery, loadingPeople } = usePeopleData(searchTerm);

    return (
        <div className="bg-blue-950 min-h-screen flex flex-col items-center">
            <div className='p-2'>
                <h2 className='text-white text-base font-bold'>Search through characters, planets, starships, vehicles, species, and films</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center">
                    <Input label="" {...register("search")} rightIcon={ <Search />}/>
                </form>
            </div>
            {loadingPeople ? (
                <div className="flex justify-center items-center h-screen">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {peopleQuery?.results.map((people) => {
                            const id = people.url.split("/").filter(Boolean).pop();
                            return (
                                <Card key={people.name} title={people.name}>
                                    <div className="h-full w-full">
                                        <p className="text-red-800 text-sm lg:text-lg font-bold leading-10">
                                            Height: <span className="text-black font-semibold text-sm">{people.height}</span>
                                        </p>
                                        <p className="text-red-800 text-sm lg:text-lg font-bold leading-10">
                                            Mass: <span className="text-black font-semibold text-sm">{people.mass}</span>
                                        </p>
                                        <p className="text-red-800 text-sm lg:text-lg font-bold leading-10">
                                            Birth year: <span className="text-black font-semibold text-sm">{people.birth_year}</span>
                                        </p>
                                        <p className="text-red-800 text-sm lg:text-lg font-bold leading-10">
                                            Gender: <span className="text-black font-semibold text-sm">{people.gender}</span>
                                        </p>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {!!peopleQuery?.next && !!peopleQuery?.previous && (
                    <Pagination
                        hasNext={Boolean(peopleQuery?.next)}
                        hasPrevious={Boolean(peopleQuery?.previous)}
                    />
                )}
                </>
            )}
        </div>
    );
};
export default Home;
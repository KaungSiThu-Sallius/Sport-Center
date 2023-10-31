import React from "react";
import { Disclosure } from '@headlessui/react';
import { Link, useParams } from "react-router-dom";
import { useSportsState } from "../../context/sports/context";
import { useUserPreferencesState } from "../../context/userPreferences/context";
const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');
export default function ArticleSubMenu() {
    let { sportID } = useParams();
    const sportState: any = useSportsState();
    const userPreferenceState: any = useUserPreferencesState();

    const { sportsDataList, isLoading, isError, errorMessage } = sportState;
    const { userpreferencesDataList, isUserPreferenceLoading, isUserPreferenceError, errorUserPreferenceMessage } = userPreferenceState

    const token = localStorage.getItem("authToken") ?? "";

    // console.log(userpreferencesDataList.sports);
    let filteredSports = sportsDataList;
    if (token) {
        filteredSports = sportsDataList.filter(sport => userpreferencesDataList.sports.includes(sport.id));
    }

    // console.log(filteredSports);
    const navigation = [
        { name: 'All News', href: '/', current: sportID === undefined },
        ...filteredSports.map((sport: any) => ({
            name: sport.name,
            href: `/${sport.id}`,
            current: sportID == sport.id,
        })),
    ];
    return (
        <Disclosure as="nav" className="border-b border-slate-200">
            {({ open }) => (
                <div className="mx-auto max-w-7xl">
                    <div className="flex h-10">
                        <div className="">
                            <div className="flex items-baseline space-x-4">
                                {
                                    navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-slate-50 text-blue-700'
                                                    : 'text-slate-500 hover:text-blue-600',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    )
}
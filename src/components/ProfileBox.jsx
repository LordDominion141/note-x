'use client';

import { CalendarDays, Mail, UserRound, X } from 'lucide-react';

const ProfileBox = ({ profile, onClose }) => {
    const accountDate = profile?.createdAt
        ? new Date(profile.createdAt).toISOString().slice(0, 10)
        : 'Not available';

    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#4e0611]/45 backdrop-blur-sm p-6 max-md:p-0" onClick={onClose}>
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="profile-title"
                className="flex max-h-[min(82dvh,720px)] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-[#eadbdd] bg-[#faf9f6] shadow-[0_40px_90px_-30px_rgba(78,6,17,0.7)] max-md:h-full max-md:max-h-none max-md:max-w-none max-md:rounded-none max-md:border-0"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#eadbdd] bg-linear-to-br from-[#fbe6e9] via-[#f9e8ea] to-white px-6 py-5 max-md:px-5 max-md:py-4">
                    <div className="min-w-0">
                        <p className="mb-2 inline-block rounded-full bg-[#b51026]/10 px-3 py-1 text-xs font-medium text-[#b51026]">Account</p>
                        <h2 id="profile-title" className="m-0 truncate text-2xl font-medium tracking-tight text-[#3a1519] max-md:text-xl">Profile</h2>
                    </div>
                    <button
                        type="button"
                        aria-label="Close profile"
                        className="mr-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-0 bg-transparent text-gray-600 hover:bg-[#f9e8ea] hover:text-[#b51026]"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </header>

                <div className="flex flex-1 flex-col items-center px-6 py-8 text-center max-md:px-5">
                    {profile?.loading ? (
                        <p className="m-0 py-12 text-sm text-gray-600">Loading profile...</p>
                    ) : profile?.error ? (
                        <p role="alert" className="m-0 py-12 text-sm text-red-700">{profile.error}</p>
                    ) : (
                        <>
                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#d74a5d] to-[#840f1e] text-white shadow-[0_14px_30px_-10px_rgba(181,16,38,0.7)] ring-4 ring-[#f9e8ea]">
                                <UserRound className="h-8 w-8" />
                            </div>
                            <h3 className="m-0 max-w-full wrap-break text-2xl font-medium text-[#3a1519]">{profile.name}</h3>
                            <p className="mb-7 mt-1 max-w-full wrap-break text-sm text-gray-500">Signed-in account</p>

                            <dl className="m-0 w-full max-w-md divide-y divide-[#f0e5e6] rounded-2xl border border-[#eadbdd] bg-white text-left">
                                <div className="flex min-h-16 items-center gap-4 px-4 py-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f9e8ea] text-[#b51026]"><Mail className="h-4 w-4" /></span>
                                    <div className="min-w-0">
                                        <dt className="text-xs font-medium text-gray-500">Email</dt>
                                        <dd className="m-0 mt-1 break-all text-sm font-medium text-gray-800">{profile.email}</dd>
                                    </div>
                                </div>
                                <div className="flex min-h-16 items-center gap-4 px-4 py-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f9e8ea] text-[#b51026]"><CalendarDays className="h-4 w-4" /></span>
                                    <div className="min-w-0">
                                        <dt className="text-xs font-medium text-gray-500">Account created</dt>
                                        <dd className="m-0 mt-1 text-sm font-medium text-gray-800">{accountDate}</dd>
                                    </div>
                                </div>
                            </dl>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProfileBox;
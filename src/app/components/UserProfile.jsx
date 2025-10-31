'use client';

import { useUser, UserButton, SignOutButton } from '@clerk/nextjs';
import { Mail, Phone, Calendar, Shield, CheckCircle, XCircle, User, Clock } from 'lucide-react';

export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-emerald-200 rounded-full"></div>
          <div className="h-4 w-32 bg-emerald-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 sm:p-8 w-[80%]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Welcome back! 🌿
            </h1>
            <p className="text-gray-600 mt-1">Manage your profile and settings</p>
          </div>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-12 h-12"
              }
            }}
          />
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Profile Header with Cover */}
          <div className="bg-linear-to-r from-emerald-500 to-teal-500 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          <SignOutButton>
            <button className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">LOG OUT</button>
          </SignOutButton>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
                </h2>
                {user.username && (
                  <p className="text-gray-500 flex items-center gap-2 mt-1">
                    <User className="w-4 h-4" />
                    @{user.username}
                  </p>
                )}
              </div>
              <div className="mt-4 sm:mt-0">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  user.primaryEmailAddress?.verification?.status === 'verified'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.primaryEmailAddress?.verification?.status === 'verified' ? '✓ Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-8 h-8 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email Addresses</p>
                    <p className="font-semibold text-gray-800">
                      {user.emailAddresses?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-8 h-8 text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Numbers</p>
                    <p className="font-semibold text-gray-800">
                      {user.phoneNumbers?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  Email Addresses
                </h3>
                <div className="space-y-3">
                  {user.emailAddresses && user.emailAddresses.length > 0 ? (
                    user.emailAddresses.map((email, index) => (
                      <div 
                        key={email.id} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{email.emailAddress}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {email.id === user.primaryEmailAddress?.id && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                                Primary
                              </span>
                            )}
                            {email.verification?.status === 'verified' ? (
                              <span className="flex items-center gap-1 text-xs text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-yellow-600">
                                <XCircle className="w-3 h-3" />
                                Unverified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No email addresses added</p>
                  )}
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  Phone Numbers
                </h3>
                <div className="space-y-3">
                  {user.phoneNumbers && user.phoneNumbers.length > 0 ? (
                    user.phoneNumbers.map((phone) => (
                      <div 
                        key={phone.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{phone.phoneNumber}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {phone.id === user.primaryPhoneNumber?.id && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                                Primary
                              </span>
                            )}
                            {phone.verification?.status === 'verified' ? (
                              <span className="flex items-center gap-1 text-xs text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-yellow-600">
                                <XCircle className="w-3 h-3" />
                                Unverified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No phone numbers added</p>
                  )}
                </div>
              </div>

              {/* Account Details */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Account Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">User ID</span>
                    <span className="font-mono text-xs text-gray-800">{user.id.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">First Name</span>
                    <span className="font-medium text-gray-800">{user.firstName || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Last Name</span>
                    <span className="font-medium text-gray-800">{user.lastName || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Username</span>
                    <span className="font-medium text-gray-800">{user.username || 'Not set'}</span>
                  </div>
                </div>
              </div>

              {/* Activity Timestamps */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Activity
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Account Created</p>
                    <p className="font-medium text-gray-800">
                      {new Date(user.createdAt).toLocaleString('en-US', {
                        dateStyle: 'long',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-800">
                      {new Date(user.updatedAt).toLocaleString('en-US', {
                        dateStyle: 'long',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                  {user.lastSignInAt && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Last Sign In</p>
                      <p className="font-medium text-gray-800">
                        {new Date(user.lastSignInAt).toLocaleString('en-US', {
                          dateStyle: 'long',
                          timeStyle: 'short'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication Status */}
            {user.twoFactorEnabled !== undefined && (
              <div className="mt-6 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Security
                </h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div>
                    {user.twoFactorEnabled ? (
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                        Enabled
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium">
                        Disabled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info (Optional - Remove in production) */}
        <details className="bg-white rounded-xl shadow-lg p-6">
          <summary className="cursor-pointer font-semibold text-gray-800 mb-2">
            🔍 View Raw User Data (Debug)
          </summary>
          <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-96 mt-4 text-black">
            {JSON.stringify(user, null, 2)}
          </pre>
        </details>
      </div>
      
    </div>
  );
}
function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function HomeUnActiveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 9.5686L12 4.25389L5 9.5686V18.9999H19V9.5686ZM3.3953 8.27582C3.14626 8.4649 3 8.75959 3 9.07227V19.9999C3 20.5522 3.44772 20.9999 4 20.9999H20C20.5523 20.9999 21 20.5522 21 20V9.07228C21 8.75959 20.8537 8.4649 20.6047 8.27582L12.6047 2.20187C12.2472 1.93047 11.7528 1.93047 11.3953 2.20187L3.3953 8.27582Z"
        fill="#242424"
      />
      <rect x="10" y="13" width="4" height="4" rx="1" fill="#242424" />
    </svg>
  );
}

function HomeActiveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1873_1889" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.3953 8.27582C3.14626 8.4649 3 8.75959 3 9.07228V19.9999C3 20.5522 3.44772 20.9999 4 20.9999H20C20.5523 20.9999 21 20.5522 21 20V9.07228C21 8.75959 20.8537 8.4649 20.6047 8.27582L12.6047 2.20187C12.2472 1.93047 11.7528 1.93047 11.3953 2.20187L3.3953 8.27582ZM11 13C10.4477 13 10 13.4477 10 14V16C10 16.5523 10.4477 17 11 17H13C13.5523 17 14 16.5523 14 16V14C14 13.4477 13.5523 13 13 13H11Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.3953 8.27582C3.14626 8.4649 3 8.75959 3 9.07228V19.9999C3 20.5522 3.44772 20.9999 4 20.9999H20C20.5523 20.9999 21 20.5522 21 20V9.07228C21 8.75959 20.8537 8.4649 20.6047 8.27582L12.6047 2.20187C12.2472 1.93047 11.7528 1.93047 11.3953 2.20187L3.3953 8.27582ZM11 13C10.4477 13 10 13.4477 10 14V16C10 16.5523 10.4477 17 11 17H13C13.5523 17 14 16.5523 14 16V14C14 13.4477 13.5523 13 13 13H11Z"
        fill="#242424"
      />
      <path
        d="M3.3953 8.27582L4.6047 9.86873L4.6047 9.86873L3.3953 8.27582ZM20.6047 8.27582L21.8141 6.68292L21.8141 6.68292L20.6047 8.27582ZM12.6047 2.20187L13.8141 0.608965V0.608965L12.6047 2.20187ZM11.3953 2.20187L10.1859 0.608965L10.1859 0.608965L11.3953 2.20187ZM5 9.07228C5 9.38496 4.85374 9.67965 4.6047 9.86873L2.1859 6.68292C1.43878 7.25016 1 8.13422 1 9.07228H5ZM5 19.9999V9.07228H1V19.9999H5ZM4 18.9999C4.55228 18.9999 5 19.4477 5 19.9999H1C1 21.6568 2.34315 22.9999 4 22.9999V18.9999ZM20 18.9999H4V22.9999H20V18.9999ZM19 20C19 19.4477 19.4477 18.9999 20 18.9999V22.9999C21.6568 22.9999 23 21.6568 23 20H19ZM19 9.07228V20H23V9.07228H19ZM19.3953 9.86872C19.1463 9.67965 19 9.38497 19 9.07228H23C23 8.13421 22.5612 7.25016 21.8141 6.68292L19.3953 9.86872ZM11.3953 3.79477L19.3953 9.86873L21.8141 6.68292L13.8141 0.608965L11.3953 3.79477ZM12.6047 3.79477C12.2472 4.06617 11.7528 4.06617 11.3953 3.79477L13.8141 0.608965C12.7417 -0.205227 11.2583 -0.205226 10.1859 0.608965L12.6047 3.79477ZM4.6047 9.86873L12.6047 3.79477L10.1859 0.608965L2.1859 6.68292L4.6047 9.86873ZM12 14C12 14.5523 11.5523 15 11 15V11C9.34315 11 8 12.3431 8 14H12ZM12 16V14H8V16H12ZM11 15C11.5523 15 12 15.4477 12 16H8C8 17.6568 9.34315 19 11 19V15ZM13 15H11V19H13V15ZM12 16C12 15.4477 12.4477 15 13 15V19C14.6569 19 16 17.6568 16 16H12ZM12 14V16H16V14H12ZM13 15C12.4477 15 12 14.5523 12 14H16C16 12.3431 14.6569 11 13 11V15ZM11 15H13V11H11V15Z"
        fill="#242424"
        mask="url(#path-1-inside-1_1873_1889)"
      />
    </svg>
  );
}

function MypageUnActiveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 18.8586C17.1962 17.0903 14.7255 16 12 16C9.27455 16 6.80375 17.0903 5 18.8586"
        stroke="#242424"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="9" stroke="#242424" strokeWidth="2" />
      <circle cx="12" cy="10" r="3" stroke="#242424" strokeWidth="2" />
    </svg>
  );
}

function MypageActiveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.71465 18.7146C6.35561 18.9756 6.01653 19.2625 5.70014 19.5727L4.30005 18.1445C6.28315 16.2004 9.00244 15 12.0001 15C14.9977 15 17.717 16.2004 19.7001 18.1445L18.3 19.5727C18.1256 19.4016 17.9442 19.2377 17.7564 19.0812L16.5001 19.5L15.5001 20.5L11.5001 21L7.00009 19L6.71465 18.7146Z"
        fill="#242424"
      />
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#242424"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="10"
        r="3"
        fill="#242424"
        stroke="#242424"
        strokeWidth="2"
      />
    </svg>
  );
}

function SearchActiveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L16.9862 16.9791M19.2105 11.6053C19.2105 13.6223 18.4093 15.5567 16.983 16.983C15.5567 18.4093 13.6223 19.2105 11.6053 19.2105C9.58822 19.2105 7.65379 18.4093 6.22753 16.983C4.80127 15.5567 4 13.6223 4 11.6053C4 9.58822 4.80127 7.65379 6.22753 6.22753C7.65379 4.80127 9.58822 4 11.6053 4C13.6223 4 15.5567 4.80127 16.983 6.22753C18.4093 7.65379 19.2105 9.58822 19.2105 11.6053Z"
        stroke="#ffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookUnActiveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#242424"
      width="24"
      height="24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-book"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19"></path>
      <path d="M4 6.5C4 4.567 5.567 3 7.5 3h9c1.933 0 3.5 1.567 3.5 3.5v11c0 1.933-1.567 3.5-3.5 3.5h-9c-1.933 0-3.5-1.567-3.5-3.5v-11z"></path>
    </svg>
  );
}

function BookActiveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#242424"
      width="24"
      height="24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-book"
    >
      <path
        d="M4 6.5C4 4.567 5.567 3 7.5 3h9c1.933 0 3.5 1.567 3.5 3.5v11c0 1.933-1.567 3.5-3.5 3.5h-9c-1.933 0-3.5-1.567-3.5-3.5v-11z"
        fill="#242424"
      ></path>

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        stroke="white"
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19"
        mask="url(#path-1-inside-1_1)"
      ></path>
    </svg>
  );
}

function CancelIcon(props: any) {
  return (
    <svg
      width="18"
      height="18"
      {...props}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="7" fill="#242424" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5263 6.47358C11.7879 6.73519 11.7879 7.15934 11.5263 7.42095L7.42106 11.5262C7.15945 11.7878 6.7353 11.7878 6.47369 11.5262C6.21208 11.2646 6.21208 10.8404 6.47369 10.5788L10.5789 6.47358C10.8406 6.21197 11.2647 6.21197 11.5263 6.47358Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5264 11.5263C11.2648 11.7879 10.8407 11.7879 10.5791 11.5263L6.47379 7.42106C6.21218 7.15945 6.21218 6.7353 6.47379 6.47369C6.7354 6.21208 7.15955 6.21208 7.42116 6.47369L11.5264 10.5789C11.788 10.8406 11.788 11.2647 11.5264 11.5263Z"
        fill="white"
      />
    </svg>
  );
}

export {
  EditInactiveIcon,
  EditActiveIcon,
  DeleteInactiveIcon,
  DeleteActiveIcon,
  HomeActiveIcon,
  HomeUnActiveIcon,
  MypageUnActiveIcon,
  MypageActiveIcon,
  SearchActiveIcon,
  BookActiveIcon,
  BookUnActiveIcon,
  CancelIcon,
};

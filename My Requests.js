document.addEventListener('DOMContentLoaded', function() {
    const RequestContainer = document.getElementById('request-container');
    const filterSelect = document.getElementById('typeFilterSelect');
    const statusFilterSelect = document.getElementById('statusFilterSelect');
    const fromDateInput = document.getElementById('fromDateInput');
    const toDateInput = document.getElementById('toDateInput');
    const filterButton = document.getElementById('filterButton');
    const resetButton = document.getElementById('resetButton');
    const sortIcon = document.getElementById('sortIcon');

    const requestStatuses = [
        { id: '78', status: 'completed', title: 'Food Donation', requester: 'Ilan Shtilman', type: 'Food', date: '2024-05-01', volunteer: 'Jane Smith' },
        { id: '90', status: 'pending', title: 'Medicine Delivery', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-05-15', volunteer: 'Yosef Levi' },
        { id: '91', status: 'completed', title: 'Language Tutoring', requester: 'Ilan Shtilman', type: 'Education', date: '2024-05-20', volunteer: 'John Doe' },
        { id: '92', status: 'in-progress', title: 'Medical Consultation', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-06-02', volunteer: 'Anna Ivanova' },
        { id: '93', status: 'completed', title: 'Community Cleanup', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-06-10', volunteer: 'Ahmed Hassan' },
        { id: '94', status: 'pending', title: 'English Language Class', requester: 'Ilan Shtilman', type: 'Education', date: '2024-06-15', volunteer: 'David Lee' },
        { id: '95', status: 'completed', title: 'Health Awareness Campaign', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-06-20', volunteer: 'Sara Abebe' },
        { id: '96', status: 'completed', title: 'Food Drive', requester: 'Ilan Shtilman', type: 'Food', date: '2024-07-05', volunteer: 'Carlos Rodriguez' },
        { id: '97', status: 'completed', title: 'Community Gardening', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-07-12', volunteer: 'Sophie Martin' },
        { id: '98', status: 'completed', title: 'Mathematics Tutoring', requester: 'Ilan Shtilman', type: 'Education', date: '2024-07-18', volunteer: 'Leah Cohen' },
        { id: '99', status: 'completed', title: 'Medical Supplies Donation', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-07-25', volunteer: 'Maria Garcia' },
        { id: '100', status: 'completed', title: 'Neighborhood Watch', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-08-01', volunteer: 'Yosef Levi' },
        { id: '101', status: 'completed', title: 'Literacy Program', requester: 'Ilan Shtilman', type: 'Education', date: '2024-08-10', volunteer: 'Fatima Al-Mahdi' },
        { id: '102', status: 'completed', title: 'Health Screening Camp', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-08-15', volunteer: 'Michael Johnson' },
        { id: '103', status: 'completed', title: 'Environmental Cleanup', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-08-22', volunteer: 'Amanuel Tesfaye' },
        { id: '104', status: 'completed', title: 'Language Exchange Program', requester: 'Ilan Shtilman', type: 'Education', date: '2024-09-05', volunteer: 'Olena Petrova' }
    ];

    // Populate filter options based on request types
    const populateFilterOptions = () => {
        const types = requestStatuses.map(request => request.type);
        const uniqueTypes = [...new Set(types)];
        uniqueTypes.forEach(type => {
            const option = document.createElement('option');
            option.textContent = type;
            option.value = type.toLowerCase();
            filterSelect.appendChild(option);
        });
    };

    const populateStatusFilterOptions = () => {
        const statuses = requestStatuses.map(request => request.status);
        const uniqueStatuses = [...new Set(statuses)];
        uniqueStatuses.forEach(status => {
            const option = document.createElement('option');
            option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            option.value = status.toLowerCase();
            statusFilterSelect.appendChild(option);
        });
    };

    populateFilterOptions();
    populateStatusFilterOptions();

    const populateRequest = () => {
        RequestContainer.innerHTML = ''; // Clear existing content

        requestStatuses.forEach(request => {
            const item = document.createElement('div');
            item.classList.add('request-item');
            item.dataset.status = request.status.toLowerCase(); // For filtering
            item.innerHTML = `
                <div>${request.id}</div>
                <div>${request.title}</div>
                <div>${request.requester}</div>
                <div>${request.type}</div>
                <div>${request.date}</div>
                <div>${request.volunteer}</div>
                <div>${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</div>
                <div><a href="Request Details.html?id=${request.id}">...</a></div>
            `;
           RequestContainer.appendChild(item);
        });
    };

    populateRequest();

    // Function to filter request items based on filters
    const filterRequest = () => {
        const selectedType = filterSelect.value.toLowerCase();
        const selectedStatus = statusFilterSelect.value.toLowerCase();
        const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
        const toDate = toDateInput.value ? new Date(toDateInput.value) : null;

        const itemsToDisplay = Array.from(RequestContainer.children);

        itemsToDisplay.forEach(item => {
            const itemType = item.children[3].textContent.toLowerCase(); // Type column
            const itemStatus = item.children[6].textContent.toLowerCase(); // Status column
            const itemDate = new Date(item.children[4].textContent);

            const typeMatches = selectedType === '' || itemType === selectedType;
            const statusMatches = selectedStatus === '' || itemStatus === selectedStatus;
            const dateInRange = (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate);

            if (typeMatches && statusMatches && dateInRange) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // Event listeners for filter and reset buttons
    filterButton.addEventListener('click', filterRequest);

    resetButton.addEventListener('click', () => {
        fromDateInput.value = '';
        toDateInput.value = '';
        filterSelect.value = '';
        statusFilterSelect.value = '';
        populateRequest();
    });

    // Sorting functionality by completion date
    let sortAsc = true; // Default sort order

    sortIcon.addEventListener('click', () => {
        sortAsc = !sortAsc; // Toggle sort order
        const sortedRequests = requestStatuses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortAsc ? dateA - dateB : dateB - dateA;
        });
        populateRequest(); // Update the UI with sorted data
    });

    // Initialize Flatpickr for date inputs
    flatpickr("#fromDateInput", {
        dateFormat: 'Y-m-d',
        maxDate: 'today',
        onChange: function(selectedDates, dateStr) {
            toDateCalendar.set('minDate', dateStr);
            filterRequest();
        }
    });

    const toDateCalendar = flatpickr("#toDateInput", {
        dateFormat: 'Y-m-d',
        maxDate: 'today',
        onChange: function(selectedDates, dateStr) {
            fromDateCalendar.set('maxDate', dateStr);
            filterRequest();
        }
    });

    const fromDateCalendar = toDateCalendar; // Share calendar instance to sync date ranges
});

import Search from "../../components/form/SearchInput.jsx";
import InputText from "../../components/form/InputText.jsx";
import MessageBox from "../../components/MessageBox.jsx";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button.jsx";
import Modal from "../../components/Modal.jsx";
import Close from "../../components/Close.jsx";
import API from "../../services/api.js";
import HR from "../../components/HR";

const AdminPage = () => {
  const [companies, setCompanies] = useState([]);
  const [allColumnKeys, setAllColumnKeys] = useState([]);
  const [selectedColumnKeys, setSelectedColumnKeys] = useState([]);

  const [showFiltering, setShowFiltering] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [showSubmitResult, setShowSubmitResult] = useState(false);
  const [formResponse, setFormResponse] = useState({
    message: "",
    success: false,
  });

  const initialFormState = {
    name: "",
    code: "",
    address: "",
    email: "",
    active: false,
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/companies/addCompany", formData);
      if (res.status === 201) {
        setFormData(initialFormState);
        setIsNewData((prev) => !prev);
        setFormResponse({
          message: res.message,
          success: true,
        });
        setShowSubmitResult((prev) => !prev)
      } else if (res.status === 500) {
        setFormResponse({
          message: res.message,
          success: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch companies + build columns dynamically
  useEffect(() => {
    const controller = new AbortController();

    const fetchCompanies = async () => {
      try {
        const res = await API.get("/companies", { signal: controller.signal });
        const data = Array.isArray(res.data) ? res.data : [];

        setCompanies(data);

        if (data.length > 0) {
          const keys = Object.keys(data[0]);
          setAllColumnKeys(keys);
          setSelectedColumnKeys(keys); // default: all selected
        } else {
          setAllColumnKeys([]);
          setSelectedColumnKeys([]);
        }
      } catch (err) {
        if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    fetchCompanies();
    return () => controller.abort();
  }, [isNewData]);

  const safeToggleColumn = (key) => {
    setSelectedColumnKeys((prev) => {
      const next = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];

      return next.length === 0 ? prev : next;
    });
  };

  const filteredCompanies = useMemo(() => {
    const q = search.trim().toLowerCase();

    return companies.filter((c) => {
      if (!q) return true;

      return Object.values(c).some((val) =>
        String(val ?? "")
          .toLowerCase()
          .includes(q),
      );
    });
  }, [companies, search]);

  const selectedColumns = useMemo(() => {
    const set = new Set(selectedColumnKeys);
    return allColumnKeys.filter((k) => set.has(k));
  }, [allColumnKeys, selectedColumnKeys]);

  const formatCell = (key, value) => {
    if (typeof value === "boolean") return value ? "Yes" : "No";

    const lowerKey = key.toLowerCase();
    if (
      value &&
      (lowerKey.includes("date") ||
        lowerKey.includes("created") ||
        lowerKey.includes("updated"))
    ) {
      const d = new Date(value);
      if (!Number.isNaN(d.getTime())) return d.toLocaleString();
    }

    return String(value ?? "");
  };

  const prettifyLabel = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const clearSearch = () => setSearch("");

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto max-w-6xl py-10">
        {/* Header Card */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Companies
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage company records, search, and control visible columns.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-500">
                {filteredCompanies.length} result
                {filteredCompanies.length !== 1 ? "s" : ""}
              </div>

              {/* Modern toggle for filters */}
              <Button
                onClick={() => setShowFiltering((v) => !v)}
                className={`inset-shadow-sm relative inline-flex h-8 w-14 items-center rounded-full border transition ${
                  showFiltering
                    ? "bg-blue-400 border-blue-400"
                    : "bg-gray-200 border-gray-200"
                }`}
                aria-pressed={showFiltering}
                aria-label="Toggle filters"
              >
                <span
                  className={`inline-block h-6 w-12 transform rounded-full bg-white transition ${
                    showFiltering ? "-translate-x-3" : "translate-x-3"
                  }`}
                />
              </Button>

              <span className="text-sm text-gray-700 select-none">Filters</span>
            </div>
          </div>

          {/* Search row */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-md">
              <Search
                placeholder="Search company"
                className="text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-2">
              <Button
                onClick={() => setShowAddCompany((v) => !v)}
                className="text-xs"
              >
                Add Company
              </Button>
              <Button className="text-xs">Generate Password</Button>
            </div>
          </div>
          {/* Add Company Form  */}
          <Modal
            open={showAddCompany}
            onClose={() => setShowAddCompany(false)}
            variant="medium"
          >
            <div className="gap-2 flex flex-col justify-between">
              <div className="flex items-center flex-row justify-between">
                <div className="font-bold">Add Company</div>
                <Close onClick={() => setShowAddCompany(false)}></Close>
              </div>
              {/* Info box */}
              {formResponse.message && (
                <MessageBox type={formResponse.success ? "success" : "error"}>
                  {formResponse.message}
                </MessageBox>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputText
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isRequired
                ></InputText>
                <InputText
                  label="Code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  isRequired
                ></InputText>
                <InputText
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                ></InputText>
                <InputText
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isRequired
                ></InputText>
                <Button variant="primary" className="mt-2">
                  Submit
                </Button>
              </form>
            </div>
          </Modal>
          {/* Filtering Panel */}
          {showFiltering && (
            <div className="bg-gray-100 shadow-inner p-4 mt-5 rounded-xl">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Visible columns
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Pick which fields appear in the table.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedColumnKeys(allColumnKeys)}
                    disabled={allColumnKeys.length === 0}
                    className="text-xs"
                  >
                    Select all
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (allColumnKeys.length > 0) {
                        setSelectedColumnKeys([allColumnKeys[0]]);
                      }
                    }}
                    disabled={allColumnKeys === 0}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {allColumnKeys.map((key) => {
                  const checked = selectedColumnKeys.includes(key);
                  return (
                    <label
                      key={key}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition ${
                        checked
                          ? "bg-white border-gray-200"
                          : "bg-transparent border-transparent hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => safeToggleColumn(key)}
                      />
                      <span className="truncate">{prettifyLabel(key)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Table Card */}
        <div className="mt-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Sticky header */}
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="sticky top-0 z-10 bg-blue-50">
                <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 flex gap-6">
                  {selectedColumns.map((key) => (
                    <div key={key} className="min-w-40">
                      {prettifyLabel(key)}
                    </div>
                  ))}
                </div>
              </div>

              <HR />

              <div className="divide-y">
                {filteredCompanies.map((row, idx) => (
                  <div
                    key={row.code ?? row.id ?? idx}
                    className={`border-none px-5 py-3 text-sm flex gap-6 transition ${idx % 2 == 0 ? "bg-white" : "bg-blue-50"}`}
                  >
                    {selectedColumns.map((key) => (
                      <div key={key} className="min-w-40 text-gray-800">
                        {formatCell(key, row[key])}
                      </div>
                    ))}
                  </div>
                ))}

                {filteredCompanies.length === 0 && (
                  <div className="px-5 py-10 text-sm text-gray-500">
                    No results found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Footer hint */}
        <div className="mt-3 text-xs text-gray-500">
          Tip: Use Filters to show fewer columns for a cleaner table.
        </div>
      </div>
    </main>
  );
};

export default AdminPage;

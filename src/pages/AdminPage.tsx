import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, DollarSign, Package, Plus, ArrowLeft, Briefcase, Presentation, Loader } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProducts, Product } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useFirebaseAuth } from '../firebase/auth';
import { uploadImageToCloudinary } from '../firebase/cloudinary';
import { getSalesDataLastSevenDays } from '../firebase/services';

const initialFormState = {
  id: '',
  name: '',
  price: '12.00',
  image: '',
  description: ''
};

const AdminPage: React.FC = () => {
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const { cart, cartSubtotal, cartDiscount } = useCart();
  const { user, loading: authLoading, error: authError, loginWithEmail, logout } = useFirebaseAuth();
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'produtos' | 'vendas'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [salesChartData, setSalesChartData] = useState<Array<{ day: string; vendas: number; meta: number }>>([]);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch real sales data on component mount
  useEffect(() => {
    const loadSalesData = async () => {
      try {
        const data = await getSalesDataLastSevenDays();
        setSalesChartData(data);
      } catch (error) {
        console.error('Erro ao carregar dados de vendas:', error);
      }
    };
    loadSalesData();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await loginWithEmail(adminEmail.trim(), adminPassword);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Erro ao fazer login.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao sair do admin:', error);
    }
  };

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalProducts = products.length;
  const averagePrice = useMemo(() => {
    if (!products.length) return 0;
    return products.reduce((sum, product) => sum + product.price, 0) / products.length;
  }, [products]);

  // Gerar dados de categorias reais
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    products.forEach((product) => {
      const category = product.category || 'Sem categoria';
      categories[category] = (categories[category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [products]);

  const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#f97316'];

  // Calculate sales metrics based on real sales data
  const totalRealSales = salesChartData.reduce((sum, day) => sum + day.vendas, 0);
  const salesGoal = Math.max(2400, totalRealSales * 1.2);
  const salesDifference = Math.max(0, salesGoal - totalRealSales);
  const estimatedConversions = Math.floor(totalRealSales / 30);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <p className="text-xl font-semibold">Carregando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!user || user.isAnonymous) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-white">Acesso Admin</h1>
            <p className="mt-2 text-slate-400">Faça login com seu e-mail e senha para acessar o painel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block text-sm font-semibold text-slate-300">
              E-mail
              <input
                type="email"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500"
                placeholder="admin@dofornoaoaltar.com"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-300">
              Senha
              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </label>

            {loginError && (
              <div className="rounded-2xl bg-rose-950/70 px-4 py-3 text-sm text-rose-200">
                {loginError}
              </div>
            )}

            {authError && (
              <div className="rounded-2xl bg-rose-950/70 px-4 py-3 text-sm text-rose-200">
                {authError.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginLoading ? 'Entrando...' : 'Entrar no Admin'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const openAddModal = () => {
    setFormData(initialFormState);
    setImagePreview('');
    setEditing(false);
    setMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price.toFixed(2),
      image: product.image,
      description: product.description
    });
    setImagePreview(product.image);
    setEditing(true);
    setMessage('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setImagePreview('');
  };

  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Upload to Cloudinary
    setIsUploadingImage(true);
    try {
      const cloudinaryUrl = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: cloudinaryUrl }));
      setImagePreview(cloudinaryUrl);
      setMessage('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setMessage('Erro ao fazer upload. Tentando salvar com preview local...');
      // Fallback to local preview URL if upload fails
      setFormData((prev) => ({ ...prev, image: previewUrl }));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productPayload: Omit<Product, 'id'> = {
      name: formData.name.trim() || 'Novo produto',
      price: Number(formData.price) || 0,
      image: formData.image.trim() || imagePreview || '/placeholder-product.jpeg',
      description: formData.description.trim() || 'Descrição do produto.',
    };

    if (editing && formData.id) {
      await updateProduct({ id: formData.id, ...productPayload });
      setMessage('Produto atualizado com sucesso!');
    } else {
      await addProduct(productPayload);
      setMessage('Produto adicionado ao catálogo!');
    }

    closeModal();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="w-full lg:w-[320px] border-r border-slate-800 bg-slate-900 px-6 py-8">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">Admin</span>
            <h1 className="mt-6 text-3xl font-semibold text-white">Painel de Controle</h1>
            <p className="mt-3 text-sm text-slate-400">Gerencie produtos e vendas de forma profissional.</p>
            <button
              onClick={handleLogout}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-rose-600/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-600/20"
            >
              Sair do Admin
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <Presentation className="h-4 w-4" /> },
              { id: 'produtos', label: 'Produtos', icon: <Package className="h-4 w-4" /> },
              { id: 'vendas', label: 'Vendas', icon: <BarChart3 className="h-4 w-4" /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id as 'dashboard' | 'produtos' | 'vendas')}
                className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-left transition ${selectedTab === item.id ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Resumo rápido</p>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Produtos</span>
                <span className="font-semibold text-white">{totalProducts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Receita</span>
                <span className="font-semibold text-white">R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Conversões</span>
                <span className="font-semibold text-white">{estimatedConversions}</span>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
        </aside>

        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
          {selectedTab === 'dashboard' && (
            <section className="space-y-6">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Área administrativa</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Dashboard</h2>
              </div>

              <div className="grid gap-6 xl:grid-cols-3">
                <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-sm uppercase tracking-[0.3em]">Receita</span>
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <p className="mt-6 text-4xl font-semibold text-white">R$ {cartSubtotal.toFixed(2).replace('.', ',')}</p>
                  <p className="mt-3 text-sm text-slate-400">Estimativa de valor do carrinho em aberto.</p>
                </article>
                <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-sm uppercase tracking-[0.3em]">Média</span>
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <p className="mt-6 text-4xl font-semibold text-white">R$ {averagePrice.toFixed(2).replace('.', ',')}</p>
                  <p className="mt-3 text-sm text-slate-400">Preço médio do catálogo.</p>
                </article>
                <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-sm uppercase tracking-[0.3em]">Meta</span>
                    <Package className="h-5 w-5" />
                  </div>
                  <p className="mt-6 text-4xl font-semibold text-white">R$ {salesDifference.toFixed(2).replace('.', ',')}</p>
                  <p className="mt-3 text-sm text-slate-400">Falta para atingir a meta fictícia.</p>
                </article>
              </div>

              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-white">Vendas da semana</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="day" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px', color: '#f1f5f9' }} />
                      <Legend wrapperStyle={{ color: '#94a3b8' }} />
                      <Line type="monotone" dataKey="vendas" stroke="#6366f1" strokeWidth={2} name="Vendas" />
                      <Line type="monotone" dataKey="meta" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-white">Categorias</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px', color: '#f1f5f9' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          )}

          {selectedTab === 'produtos' && (
            <section className="space-y-8">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-white">Produtos</h2>
                  <p className="mt-2 text-slate-400">Gerencie produtos do catálogo, com edição e remoção via modal.</p>
                </div>
                <button
                  onClick={openAddModal}
                  className="inline-flex items-center gap-2 rounded-3xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  <Plus className="h-4 w-4" /> Adicionar produto
                </button>
              </div>

              {message && (
                <div className="rounded-3xl border border-emerald-700 bg-emerald-950/80 p-4 text-emerald-200 shadow-sm">{message}</div>
              )}

              <div className="grid gap-5">
                {products.map((product) => (
                  <div key={product.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">ID {product.id}</p>
                        <h4 className="mt-2 text-2xl font-semibold text-white">{product.name}</h4>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">{product.description}</p>
                        <p className="mt-4 text-lg font-semibold text-slate-100">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <button
                          onClick={() => openEditModal(product)}
                          className="rounded-full border border-slate-700 bg-slate-800 px-4 py-3 font-semibold text-indigo-300 transition hover:bg-slate-700"
                        >Editar</button>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="rounded-full border border-rose-700 bg-rose-950/20 px-4 py-3 font-semibold text-rose-300 transition hover:bg-rose-900"
                        >Remover</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedTab === 'vendas' && (
            <section className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white">Vendas</h2>
                <p className="mt-2 text-slate-400">Análise e métricas de vendas.</p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Vendas em aberto</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Painel de vendas</h3>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300">Receita</span>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Receita total</p>
                    <p className="mt-4 text-3xl font-semibold text-white">R$ {cartSubtotal.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Desconto aplicado</p>
                    <p className="mt-4 text-3xl font-semibold text-white">R$ {cartDiscount.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <h4 className="text-lg font-semibold text-white">Indicadores de performance</h4>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Itens no carrinho</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{totalItemsInCart}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Conversões</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{estimatedConversions}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Meta restante</p>
                    <p className="mt-3 text-3xl font-semibold text-white">R$ {salesDifference.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-white">Vendas por dia (últimos 7 dias)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="day" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px', color: '#f1f5f9' }} />
                      <Legend wrapperStyle={{ color: '#94a3b8' }} />
                      <Bar dataKey="vendas" fill="#6366f1" name="Vendas" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-white">Distribuição de vendas por categoria</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px', color: '#f1f5f9' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 p-6 shadow-2xl border border-slate-800 my-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">{editing ? 'Editar produto' : 'Adicionar produto'}</h3>
                <p className="mt-1 text-sm text-slate-400">Preencha as informações e escolha imagem por foto ou galeria.</p>
              </div>
              <button onClick={closeModal} className="text-slate-400 transition hover:text-white flex-shrink-0">Fechar</button>
            </div>

            <form id="product-form" onSubmit={handleSubmit} className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Nome
                  <input
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500"
                    placeholder="Ex: Brownie c/ Brigadeiro"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-300">
                  Preço
                  <input
                    value={formData.price}
                    onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                    type="number"
                    step="0.01"
                    min="0"
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500"
                    placeholder="12.90"
                  />
                </label>
              </div>

              <label className="block text-sm font-semibold text-slate-300">
                Descrição
                <textarea
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  className="mt-2 h-24 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500"
                  placeholder="Descrição do produto"
                />
              </label>

              <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                <label className="block text-sm font-semibold text-slate-300">
                  URL da imagem
                  <input
                    value={formData.image}
                    onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500"
                    placeholder="https://..."
                  />
                </label>

                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm font-semibold text-slate-300">Imagem via câmera ou galeria</p>
                  {isUploadingImage && (
                    <p className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                      <Loader className="w-3 h-3 animate-spin" /> Fazendo upload no Cloudinary...
                    </p>
                  )}
                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Tirar foto
                    </button>
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Escolher da galeria
                    </button>
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileSelection}
                    />
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelection}
                    />
                  </div>
                </div>
              </div>

              {imagePreview && (
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Pré-visualização</p>
                  <img src={imagePreview} alt="Preview" className="mt-3 h-32 w-full rounded-3xl object-cover" />
                </div>
              )}

              {message && (
                <div className="rounded-2xl bg-emerald-950/70 px-4 py-3 text-sm text-emerald-200">
                  {message}
                </div>
              )}
            </form>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-6">
              <button
                type="submit"
                form="product-form"
                className="rounded-3xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                {editing ? 'Salvar alterações' : 'Salvar produto'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-3xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
